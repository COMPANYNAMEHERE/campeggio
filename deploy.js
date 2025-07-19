const { execSync } = require('child_process');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('npm test');
  run('npm run build');
  console.log('Build complete.');
} catch (e) {
  process.exitCode = 1;
}
