const fs = require('fs');
const path = require('path')
const readline = require('readline');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const rl = readline.createInterface(stdin, stdout);

rl.write('Write your text here \n');

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close();
        return;
    }
    output.write(input + '\n');
});

rl.on('close', () => {
    stdout.write('Your text in text.txt is ready \n');
    process.exit(0);
})



