var fs = require('fs');
var util = require('./build-scripts/util');

console.log('Publishing shared npm packages');

fs.readdirSync('./', { encoding: 'utf-8' }).forEach(child => {
    if (fs.statSync(child).isDirectory() &&  ['build-scripts', '.git', '_download'].indexOf(child) < 0) {
        console.log('\n----------------------------------');
        console.log(child);
        console.log('----------------------------------');
        util.cd(child);
        util.cd('_build');
        try {
            util.run('npm publish');
        }
        catch(ex) {
            console.log('Publish failed - this usually indicates that the package has already been published');
        }
        util.cd('..');
        util.cd('..');
    }
});
