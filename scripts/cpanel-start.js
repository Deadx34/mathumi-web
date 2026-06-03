const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

process.env.NODE_ENV = 'production';

async function main() {
	const envPort = process.env.PORT || process.env.APP_PORT || process.env.NODEJS_PORT || process.env.CPANEL_PORT;
	if (envPort) {
		const parsedPort = Number.parseInt(envPort, 10);
		if (!Number.isInteger(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
			throw new Error(`Invalid port value: ${envPort}`);
		}
		process.env.PORT = String(parsedPort);
	} else {
		console.warn('[cpanel:start] No cPanel port env detected; using local fallback port 3000.');
		process.env.PORT = '3000';
	}

const buildIdPath = path.join(__dirname, '..', '.next', 'BUILD_ID');

if (!fs.existsSync(buildIdPath)) {
	const nextCli = require.resolve('next/dist/bin/next');
	const buildResult = spawnSync(process.execPath, [nextCli, 'build', '--webpack'], {
		stdio: 'inherit',
		env: process.env,
	});

	if (buildResult.error) {
		throw buildResult.error;
	}

	if ((buildResult.status ?? 1) !== 0) {
		process.exit(buildResult.status ?? 1);
	}
}

const standaloneServerPath = path.join(__dirname, '..', '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServerPath)) {
	require(standaloneServerPath);
} else {
	require('../index.js');
}
}

main().catch((error) => {
	console.error('⨯ Failed to start server');
	console.error(error);
	process.exit(1);
});
