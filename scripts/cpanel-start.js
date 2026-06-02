const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

process.env.NODE_ENV = 'production';

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
