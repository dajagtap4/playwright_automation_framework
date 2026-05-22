
const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
const ACTIVE_LEVEL = LEVELS[(process.env.LOG_LEVEL || 'info').toLowerCase()] || LEVELS.info;


function format(level, scope, msg) {
 const timestamp = new Date().toISOString();
 const tag = scope ? `[${scope}]` : '';
 return `${timestamp} ${level.toUpperCase().padEnd(5)} ${tag} ${msg}`;
}


function write(level, scope, msg) {
 if (LEVELS[level] < ACTIVE_LEVEL) return;
 const line = format(level, scope, msg);
 if (level === 'error') {
   process.stderr.write(`${line}\n`);
 } else {
   process.stdout.write(`${line}\n`);
 }
}


function build(scope) {
 return {
   debug: (msg) => write('debug', scope, msg),
   info: (msg) => write('info', scope, msg),
   warn: (msg) => write('warn', scope, msg),
   error: (msg) => write('error', scope, msg),
   child: ({ scope: childScope } = {}) =>
     build(scope ? `${scope}:${childScope}` : childScope),
 };
}


module.exports = build();
