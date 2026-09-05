// Model-free, finite native-stop fixture. Run only via the documented manual probe.
const fs = require('node:fs');
const {spawn} = require('node:child_process');
const out = process.argv[2];
if (!out) throw Error('An owned output prefix is required');
if (process.argv[3] === 'child') {
  const end = Date.now() + 15000;
  setInterval(() => {
    fs.writeFileSync(out + '.child', JSON.stringify({pid: process.pid, tick: Date.now()}));
    if (Date.now() > end) process.exit(0);
  }, 100);
} else {
  const child = spawn(process.execPath, [__filename, out, 'child'], {windowsHide: true, stdio: 'ignore'});
  fs.writeFileSync(out + '.parent', JSON.stringify({pid: process.pid, childPid: child.pid}));
  setTimeout(() => process.exit(0), 14000);
}
