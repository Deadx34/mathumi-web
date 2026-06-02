const { spawnSync } = require('child_process');

process.env.NODE_ENV = 'production';

const nextCli = require.resolve('next/dist/bin/next');
const result = spawnSync(process.execPath, [nextCli, 'build', '--webpack'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
