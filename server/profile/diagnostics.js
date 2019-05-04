const diagnostics = require('diagnostics');

let index = 0;
const limit = 200;
const history = new Array(limit);

//
// Force all `diagnostic` loggers to be enabled.
//
diagnostics.force = process.env.NODE_ENV === 'prod';
diagnostics.set(function customLogger(meta, message) {
    history[index] = { meta, message, now: Date.now() };
    if (index++ === limit) index = 0;

    //
    // We're running a development build, so output.
    //
    if (meta.dev) console.log.apply(console, message);
});

process.on('uncaughtException', async function(err) {
    await saveErrorToDisk(err, history);
    process.exit(1);
});