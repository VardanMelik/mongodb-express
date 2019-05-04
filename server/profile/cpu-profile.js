var fs = require('fs');
var profiler = require('v8-profiler');
var snapshot1 = profiler.takeSnapshot();
var snapshot2 = profiler.takeSnapshot();

console.log(snapshot1.getHeader(), snapshot2.getHeader());

console.log(snapshot1.compare(snapshot2));

// Export snapshot to file file
snapshot1.export(function(error, result) {
    fs.writeFileSync('snapshot1.json', result);
    snapshot1.delete();
});

// Export snapshot to file stream
snapshot2.export()
    .pipe(fs.createWriteStream('snapshot2.json'))
    .on('finish', snapshot2.delete);

/*const fs = require('fs');
const profiler = require('v8-profiler');

profiler.startProfiling('probe', true);

setTimeout(() => {
    const profile = profiler.stopProfiling('probe');
    profile.export((error, result) => {
        fs.writeFileSync('nodehero.cpuprofile', result);
        profile.delete();
        process.exit();
    });
}, 2000);*/