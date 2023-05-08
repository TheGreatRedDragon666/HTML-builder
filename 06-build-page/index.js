const fs = require('fs');
const path = require('path');

const handleErr = function(err) {
    if (err) {
        throw err
    }
}

const pathToDist = path.join(__dirname, 'project-dist');

function createDir(pathToDist) {
    fs.rm(pathToDist, {recursive: true, force: true}, err => {
        handleErr(err);
        fs.mkdir(pathToDist, {recursive: true}, err => {
            handleErr(err);
            bundleHTML();
            bundleCSS();
            copyDir(path.join(__dirname, 'assets'), path.join(pathToDist, 'assets'));
        });
    });
}

function bundleHTML() {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
        handleErr(err);
        let dataCopy = data;
        const regex = /\{\{(\w+)}}/g;
        const templates = dataCopy.match(regex).map(template => template.slice(2, -2));
        let count = 0;
        templates.forEach(template => {
            fs.readFile(path.join(__dirname, 'components', `${template}.html`), 'utf-8', (err, data) => {
                handleErr(err);
                dataCopy = dataCopy.replace(`{{${template}}}`, `${data}`);
                count += 1;
                if (count === templates.length) {
                    fs.writeFile(path.join(pathToDist, 'index.html'), dataCopy, handleErr);
                }
            });
        })
    })
}

function bundleCSS() {
    fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
        fs.rm(path.join(__dirname, 'project-dist', 'style.css'), {recursive: true, force: true}, err => {
            if (err) throw err;
            fs.writeFile(
                path.join(__dirname, 'project-dist', 'style.css'),
                '',
                (err) => {
                    if (err) throw err;
                }
            );
        });
        files.forEach(file => {
            const newPath = path.join(__dirname, 'styles', file);
            fs.stat(newPath, (err, stats) => {
                if (stats.isFile() && path.extname(newPath) === '.css') {
                    fs.readFile(
                        path.join(newPath),
                        'utf-8',
                        (err, data) => {
                            if (err) throw err;
                            fs.appendFile(
                                path.join(__dirname, 'project-dist', 'style.css'),
                                `${data}\n`,
                                (err) => {
                                    if (err) throw err;
                                }
                            );
                        }
                    );
                }
            })
        })
    })
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

createDir(pathToDist);



