// <script src="https://mpeztrack.com/sites/scripts/session-replay.js"type="text/javascript"></script>

const PARAMS = qsToObj(window.location.search);
let { user = "", project_token = "2040be3097b7740c03af1f89b4362b72", project_id = "3276012", workspace_id = "3782804", mask = "recordEverything", ...restParams } = PARAMS;
if (!restParams) restParams = {};

// Function to load a script dynamically
function loadScript(url, callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// Bind the event to the callback function.
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;

	// Append the script to the head or body, doesn't really matter
	document.head.appendChild(script);
}

// URL of the external script
const externalScript = 'https://mpeztrack.com/v2.0.0/eztrack.min.js';

// Function that contains the code to run after the script is loaded
function EMBED_EZ_TRACK() {
	window.addEventListener('mpEZTrackLoaded', () => {
		mixpanel.ez.register({ "web browser": "Chrome" });

		if (user) {
			mixpanel.ez.identify(user);
			mixpanel.ez.people.set({ $name: user, $email: user });
		}

		else {
			//need to do popup!
			// const device_id = mixpanel.ez.get_property('$device_id');
			// const url = generateURL(device_id, { project_id, workspace_id });
			// console.log(`Open this URL to view the session in mixpanel:\n\n${url}\n\n`);

		}
	});
	if (mpEZTrack) {
		mpEZTrack.init(project_token, {
			record_sessions_percent: 100,
			record_inline_images: true,
			record_collect_fonts: true,
			record_mask_text_selector: mask,
			ignore_dnt: true,
			batch_flush_interval_ms: 0,
			api_payload_format: 'json',

			api_host: "https://express-proxy-lmozz6xkha-uc.a.run.app",
			//meta
			debug: true,
			extend: true,
			refresh: 0,
			location: true,
			persistence: "localStorage",

			//default on
			deviceProps: true,
			pageView: true,
			pageExit: true,
			links: true,
			buttons: true,
			forms: true,
			profiles: true,
			selectors: true,
			videos: true,
			window: false,
			spa: true,


			//default off
			inputs: true,
			clicks: true,
			youtube: false,

			clipboard: true,
			firstPage: true,
			error: true,
			tabs: true,

			//undocumented, for ez debugging
			logProps: true


		}); // Initialize the script
	}
	// Place your code here
}

function qsToObj(queryString) {
	try {
		const parsedQs = new URLSearchParams(queryString);
		const params = Object.fromEntries(parsedQs);
		return params;
	}

	catch (e) {
		return {};
	}
}


function openInNewTab(user, options, is_device = true) {
	setTimeout(() => {
		const { project_id, workspace_id } = options;
		let href = `https://mixpanel.com/project/${project_id}/view/${workspace_id}/app/profile#distinct_id=`;
		if (is_device) href += `$device:`;

		Object.assign(document.createElement('a'), {
			target: '_blank',
			rel: 'noopener noreferrer',
			href: href + user,
		}).click();
	}, 3000);
}

function generateURL(user, options, is_device = true) {
	const { project_id, workspace_id } = options;
	let href = `https://mixpanel.com/project/${project_id}/view/${workspace_id}/app/profile#distinct_id=`;
	if (is_device) href += `$device:`;
	const url = href + user;
	return url;
}

// Load the external script and run myCode when it's done
loadScript(externalScript, EMBED_EZ_TRACK);


function reset() {
	console.log('resetting....\n\n');
	if (mixpanel) {
		if (mixpanel.ez) {
			mixpanel.ez.reset();
		}
	}
	window.location.reload();
}