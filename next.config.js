/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '',
	output: "export",
	trailingSlash: true, // Updated option name
	images: {
	  unoptimized: true, // Optional: Disable image optimization for static export
	},

};

module.exports = nextConfig;
