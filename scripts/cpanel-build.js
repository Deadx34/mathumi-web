const { spawnSync } = require('child_process');

process.env.NODE_ENV = 'production';

const result = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'build', '--webpack'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
