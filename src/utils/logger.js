export function log(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    timestamp,
    level,
    message,
    ...meta
  }));
}

export default {
  info: (message, meta) => log('info', message, meta),
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  debug: (message, meta) => log('debug', message, meta)
};