const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), {recursive: true, force: true}, err => {
        if (err) throw err;
        fs.writeFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
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
                            path.join(__dirname, 'project-dist', 'bundle.css'),
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

