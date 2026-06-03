const fs = require('fs');
const net = require('net');
const path = require('path');
const { spawnSync } = require('child_process');

process.env.NODE_ENV = 'production';

function canBind(port, host = '0.0.0.0') {
	return new Promise((resolve) => {
		const server = net.createServer();
		server.once('error', () => resolve(false));
		server.once('listening', () => server.close(() => resolve(true)));
		server.listen(port, host);
	});
}

async function resolveFallbackPort(startPort = 3000, attempts = 25) {
	for (let port = startPort; port < startPort + attempts; port += 1) {
		if (await canBind(port)) {
			return port;
		}
	}

	throw new Error(`No available fallback port in range ${startPort}-${startPort + attempts - 1}`);
}

async function main() {
	const envPort = process.env.PORT || process.env.APP_PORT || process.env.NODEJS_PORT || process.env.CPANEL_PORT;
	if (envPort) {
		const parsedPort = Number.parseInt(envPort, 10);
		if (!Number.isInteger(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
			throw new Error(`Invalid port value: ${envPort}`);
		}
		process.env.PORT = String(parsedPort);
	} else {
		const fallbackPort = await resolveFallbackPort(3000, 25);
		process.env.PORT = String(fallbackPort);
		if (fallbackPort === 3000) {
			console.warn('[cpanel:start] No cPanel port env detected; using local fallback port 3000.');
		} else {
			console.warn(`[cpanel:start] No cPanel port env detected; using fallback port ${fallbackPort}.`);
		}
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
