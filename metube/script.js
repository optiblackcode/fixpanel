document.addEventListener("DOMContentLoaded", () => {
	// Get the search input element
	const searchInput = document.getElementById("search-input");

	// If we're on a search results page, focus the search input and get the query parameter
	if (searchInput) {
		searchInput.focus();

		// Get the query parameter from the URL
		const urlParams = new URLSearchParams(window.location.search);
		const query = urlParams.get("query");

		// If there's a query parameter, set it as the value of the search input
		if (query) {
			searchInput.value = query;
		}
	}

	const avatarImages = [
		"/images/avatar1.png",
		"/images/avatar2.png",
		"/images/avatar3.png",
		"/images/avatar4.png",
		"/images/avatar5.png",
		"/images/avatar6.png",
		'/images/avatar7.png',
		'/images/avatar8.png',
		'/images/avatar9.png'

	];


	// Set random avatar image
	const avatarElement = document.getElementById("user-avatar");
	if (avatarElement) {
		// Array of avatar images

		// Select a random avatar
		const randomAvatar = avatarImages[Math.floor(Math.random() * avatarImages.length)];

		// Create and append the image element
		const imgElement = document.createElement("img");
		imgElement.src = randomAvatar;
		imgElement.alt = "User avatar";
		avatarElement.appendChild(imgElement);
	}

	// Set random channel avatar
	const avatarChannelElement = document.getElementById("channel-avatar");
	if (avatarChannelElement) {
		
		// Select a random avatar
		const randomAvatar = avatarImages[Math.floor(Math.random() * avatarImages.length)];

		// Create and append the image element
		const imgElement = document.createElement("img");
		imgElement.src = randomAvatar;
		imgElement.alt = "channel avatar";
		avatarChannelElement.appendChild(imgElement);
	}



	// Add click event listeners to video cards
	const videoCards = document.querySelectorAll(".video-card, .related-video-card");
	videoCards.forEach((card) => {
		card.addEventListener("click", function () {
			const videoTitle = this.querySelector("h3").textContent;
			const channelName = this.querySelector(".channel").textContent;

			// Create URL with parameters
			const url = `video-player.html?title=${encodeURIComponent(videoTitle)}&channel=${encodeURIComponent(channelName)}`;

			// Navigate to the video player page
			window.location.href = url;
		});
	});

	// Check if we're on the video player page
	const videoTitle = document.getElementById("video-title");
	const channelName = document.getElementById("channel-name");

	if (videoTitle && channelName) {
		// Get parameters from URL
		const urlParams = new URLSearchParams(window.location.search);
		const title = urlParams.get("title");
		const channel = urlParams.get("channel");

		// Set video title and channel name
		if (title) {
			videoTitle.textContent = title;
			document.title = `${title} - MeTube`;
		}

		if (channel) {
			channelName.textContent = channel;
		}

		// Set random view count
		const viewsElement = document.getElementById("video-views");
		if (viewsElement) {
			const viewCount = Math.floor(Math.random() * 1000000);
			let formattedViews = "";

			if (viewCount > 1000000) {
				formattedViews = `${(viewCount / 1000000).toFixed(1)}M`;
			} else if (viewCount > 1000) {
				formattedViews = `${(viewCount / 1000).toFixed(1)}K`;
			} else {
				formattedViews = viewCount;
			}

			viewsElement.textContent = `${formattedViews} views • May 22, 2025`;
		}

		// Set video description
		const descriptionElement = document.getElementById("video-description-text");
		if (descriptionElement) {
			descriptionElement.textContent = `This is a detailed description of "${title}". In this video, we explore various aspects of the topic and provide valuable insights. Don't forget to like and subscribe for more content like this!`;
		}

		// Add click event for the play button
		const playIcon = document.querySelector(".play-icon");
		if (playIcon) {
			playIcon.addEventListener("click", () => {
				alert("This is a mock video player. In a real application, the video would start playing now.");
			});
		}

		// Add click events for video controls
		const controlButtons = document.querySelectorAll(".control-btn");
		controlButtons.forEach((button) => {
			button.addEventListener("click", function () {
				alert(`You clicked the ${this.classList[1]} button. This would control the video in a real player.`);
			});
		});
	}

	// Comment: To switch between no-results.html and no-results-with-featured.html
	// 1. From no-results.html, click the "View version with featured videos" link
	// 2. From no-results-with-featured.html, click the "View version without featured videos" link
	// This provides an easy way to toggle between the two versions for testing
});
