// import commander module as "program"
const program = require("commander");
// import fa module as "fs"
const fs = require("fs");

// parse CLI arguments using commander
program.parse(process.argv);
const filePath = program.args[0];

// read file async
fs.readFile(filePath, { encoding: "utf-8" }, (err, file) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
        return;
    }
    console.log(file);
})