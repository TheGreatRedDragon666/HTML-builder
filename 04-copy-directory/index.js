const fs = require('fs');
const path = require('path');

const handleErr = function(err) {
    if (err) {
        throw err
    }
}

function copyDir(pathToFiles, pathToTargetDir) {
    fs.rm(pathToTargetDir, {recursive: true, force: true}, err => {
        if (err) handleErr();
        fs.mkdir(pathToTargetDir, {recursive: true}, handleErr);
        fs.readdir(pathToFiles, {withFileTypes: true}, (err, files) => {
            files.forEach(file => {
                const pathToSourceFile = path.join(pathToFiles, file.name);
                const pathToTargetFile = path.join(pathToTargetDir, file.name);
                if (file.isDirectory()) {
                    copyDir(pathToSourceFile, pathToTargetFile);
                } else if (file.isFile()) {
                    fs.copyFile(pathToSourceFile, pathToTargetFile, handleErr);
                }
            });
        });
    });
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
