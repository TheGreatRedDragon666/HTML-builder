const fs = require('fs');
const path = require('path');

const handleErr = function(err) {
    if (err) {
        throw err
    }
}

function copyDir(dirname) {
    const pathToFiles = path.join(__dirname, dirname);
    const pathToTargetDir = path.join(__dirname, `${dirname}-copy`);
    fs.rm(pathToTargetDir, {recursive: true, force: true}, err => {
        if (err) handleErr();
        fs.mkdir(pathToTargetDir, {recursive: true}, handleErr);
        fs.readdir(pathToFiles, (err, files) => {
            files.forEach(file => {
                    const pathToSourceFile = path.join(pathToFiles, file);
                    const pathToTargetFile = path.join(pathToTargetDir, file);
                    fs.copyFile(pathToSourceFile, pathToTargetFile, handleErr);
            });
        });
    });
}

copyDir('files');
