const puppeteer = require('puppeteer');
const u = require('ak-tools');


// Helper function for more natural mouse movements
async function moveMouse(page, startX, startY, endX, endY) {
	const steps = Math.max(Math.abs(endX - startX), Math.abs(endY - startY)) / 5; // Adjust steps based on distance
	const deltaX = (endX - startX) / steps;
	const deltaY = (endY - startY) / steps;

	let currentX = startX, currentY = startY;
	for (let i = 0; i < steps; i++) {
		// Introduce some "wobble" to the movement
		const adjustedX = currentX + deltaX + u.rand(-2, 2);
		const adjustedY = currentY + deltaY + u.rand(-2, 2);
		await page.mouse.move(adjustedX, adjustedY);
		await u.sleep(u.rand(5, 30)); // Vary the pause between movements

		currentX = adjustedX;
		currentY = adjustedY;
	}

	// Ensure the mouse ends up at the exact target location
	await page.mouse.move(endX, endY);
}

// More varied scrolling behavior
async function randomScroll(page) {
	const pointA = u.rand(-200, 200);
	const pointB = u.rand(300, 500);

	const scrollOptions = [
		() => page.evaluate((pointA) => window.scrollBy(0, pointA)), // Small scrolls
		() => page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * Math.random())), // Jump to random position
		() => page.evaluate((pointB) => window.scrollBy(0, pointB * (Math.random() < 0.5 ? 1 : -1))), // Larger scrolls up or down
		() => page.evaluate(() => window.scrollTo(0, 0)), // Scroll to top
		() => page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)), // Scroll to bottom
		() => page.evaluate(() => window.scrollBy(0, window.innerHeight)) // Scroll down by window height
	];

	const scrollAction = scrollOptions[Math.floor(Math.random() * scrollOptions.length)];
	await scrollAction();
	console.log('scroll!');
	await u.sleep(u.rand(10, 150));

}

async function simulateUser(url) {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	await page.setViewport({ width: 1280, height: 800 }); // Set viewport size for consistent results
	await page.goto(url);

	let lastScrollTime = 0;
	const actions = u.rand(15, 40); // Increase the number of actions
	for (let i = 0; i < actions; i++) {
		const now = Date.now();

		// Ensure some scrolling happens regularly
		if (now - lastScrollTime > 1000 || u.rand(0, 100) < 30) {
			await randomScroll(page);			
			lastScrollTime = now;
		} else {
			await clickStuff(page);
			await u.sleep(u.rand(20, 150));
			await clickStuff(page);
			await u.sleep(u.rand(20, 150));

		}

		await u.sleep(u.rand(100, 1200)); // More varied pauses
	}

	await browser.close();
}

async function clickStuff(page) {
	const elements = await page.$$('a, button, input[type="submit"], [role="button"], [onclick]');
	const element = elements[Math.floor(Math.random() * elements.length)];

	if (element) {
		const boundingBox = await element.boundingBox();
		if (boundingBox) {
			const { x, y, width, height } = boundingBox;
			const startX = Math.random() * page.viewport().width;
			const startY = Math.random() * page.viewport().height;
			const endX = x + width / 2;
			const endY = y + height / 2;

			await moveMouse(page, startX, startY, endX, endY);
			await u.sleep(20); // Delay before clicking

			// Log to verify click position
			// console.log(`Clicking on element at (${endX}, ${endY})`);

			// Fallback: Try page.evaluate click if mouse click doesn't work
			try {
				await page.mouse.click(endX + u.rand(-3, 3), endY + u.rand(-3, 3));
				// console.log('Mouse click triggered');
			} catch (error) {
				// console.log('Mouse click failed, using evaluate click');
				await page.evaluate((el) => el.click(), element);
			}
			console.log('click!');
		}
	}

	else {
		console.log('No clickable elements found');
	}
}


async function main(url, users = 1, concurrency = 10) {
	let running = 0; // Counter for currently running simulations

	const userPromises = [];
	for (let i = 0; i < users; i++) {
		userPromises.push(new Promise(async (resolve) => {
			while (running >= concurrency) {
				await new Promise(r => setTimeout(r, 100)); // Wait if at concurrency limit
			}

			running++;
			console.log(`Starting user ${i + 1}`);
			await simulateUser(url);
			console.log(`User ${i + 1} complete`);
			running--;
			resolve();
		}));
	}

	await Promise.all(userPromises);
}


main('http://localhost:3000', 50)
	.then(() => console.log('Simulation complete'))
	.catch((error) => {

		console.error(error);
	})
	.finally(() => process.exit());