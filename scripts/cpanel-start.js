const fs = require('fs');
const net = require('net');
const path = require('path');
const { spawnSync } = require('child_process');

process.env.NODE_ENV = 'production';

function canListenOnPort(port, host = '0.0.0.0') {
	return new Promise((resolve) => {
		const server = net.createServer();
		server.once('error', () => resolve(false));
		server.once('listening', () => {
			server.close(() => resolve(true));
		});
		server.listen(port, host);
	});
}

async function resolvePort() {
	const envPort = process.env.PORT || process.env.APP_PORT || process.env.NODEJS_PORT || process.env.CPANEL_PORT;
	const basePort = Number.parseInt(envPort || '3000', 10);

	if (!Number.isInteger(basePort) || basePort <= 0 || basePort > 65535) {
		throw new Error(`Invalid port value: ${envPort}`);
	}

	if (envPort) {
		const available = await canListenOnPort(basePort);
		if (!available) {
			throw new Error(
				`Configured port ${basePort} is already in use. Stop the existing process or assign a different port in cPanel Node.js App settings.`
			);
		}
		return basePort;
	}

	for (let candidate = basePort; candidate < basePort + 25; candidate += 1) {
		const available = await canListenOnPort(candidate);
		if (available) {
			if (candidate !== basePort) {
				console.warn(`[cpanel:start] Port ${basePort} is busy; using ${candidate} instead.`);
			}
			return candidate;
		}
	}

	throw new Error(`No open port found in range ${basePort}-${basePort + 24}`);
}

async function main() {
    const port = await resolvePort();
    process.env.PORT = String(port);

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
