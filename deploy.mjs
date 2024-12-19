
import { Storage } from '@google-cloud/storage';
import { promises as fs } from 'fs';
import path from 'path';
import pLimit from 'p-limit';
const MAX_CONCURRENT_UPLOADS = 75;
const limit = pLimit(MAX_CONCURRENT_UPLOADS);

const cwd = `${process.cwd()}`;
import { progress } from 'ak-tools';


async function main(bucketName = 'fixpanel', localDir = `out`, remotePath = '') {
	console.log('\n----------\nDEPLOY START\n----------\n');
	const storage = new Storage({ keyFilename: 'service-acct.json' });

	const [remoteFiles] = await storage.bucket(bucketName).getFiles({  });
	console.log(`\n----------\nFOUND ${remoteFiles.length} FILES\n----------\n`);
	await Promise.all(remoteFiles.map(file => limit(() => file.delete())));
    console.log(`\n----------\nDELETED ${remoteFiles.length} FILES\n----------\n`);
	const localFiles = await listFiles(localDir);

	const uploadTasks = localFiles
		.filter(filterFile)
		.map(file => ({
			local: `.${file.split(cwd)[1]}`,
			remote: `${remotePath}${file.split(cwd)[1].split(localDir).pop().substring(1)}`,			
		}));


	const results = {
		success: 0,
		failed: 0,
		failedFiles: []
	};
	console.log('\n----------\nUPLOAD START\n----------\n');
	await Promise.all(uploadTasks.map(async ({ local, remote }) => {
		try {
			await limit(() => storage.bucket(bucketName).upload(local, { destination: remote }));
			results.success++;
		} catch (e) {
			console.error(`FAILED to upload ${local} to ${bucketName}`);
			results.failed++;
			results.failedFiles.push({ local, remote, error: e });
		} finally {
			progress([['success', results.success], ['failed', results.failed]]);
		}
	}));

	console.log('\n----------\nUPLOAD COMPLETE\n----------\n');
	console.log(JSON.stringify(results, null, 2));
	const URL = `https://fixpanel.storage.googleapis.com/index.html`
	console.log(`\n----------\nDEPLOYED TO: ${URL}\n----------\n`);
	return results;
}


function filterFile(file) {
	const INCLUDES = ['out'];
	const IGNORES = ['node_modules', '.git', '.DS_Store', '.env', '.gitignore', 'package-lock.json', 'package.json', 'service-acct.json', 'deploy.js', '.vscode'];
	const IGNORE_EXTENSIONS = ['.map', '.scss'];

	let shouldInclude = false;
	if (INCLUDES.some(include => file.includes(include))) shouldInclude = true;
	if (IGNORES.some(ignore => file.includes(ignore))) shouldInclude = false;
	if (IGNORE_EXTENSIONS.some(ext => file.endsWith(ext))) shouldInclude = false;
	if (file.startsWith('.')) shouldInclude = false;


	return shouldInclude;

}

async function listFiles(dir) {
	let results = [];
	const list = await fs.readdir(dir, { withFileTypes: true });

	for (const file of list) {
		const filePath = path.resolve(dir, file.name);
		if (file.isDirectory()) {
			results = results.concat(await listFiles(filePath));
		} else {
			results.push(filePath);
		}
	}

	return results;
}

await main();