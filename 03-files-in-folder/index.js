const fs = require('fs');
const path = require('path');
const {stdout} = process;

const pathToSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToSecretFolder, (err, files) => {
    files.forEach(file => {
        const newPath = path.join(__dirname, 'secret-folder', file);
        fs.stat(newPath, (err, stats) => {
            if (stats.isFile()) {
                const size = stats.size + 'B';
                const ext = path.extname(newPath).slice(1);
                const [ fileName ] = file.split('.');
                stdout.write(`${fileName} - ${ext} - ${size} \n`)
            }
        })
    })
})
