// import commander module as "program"
const program = require("commander");
// import fs module as "fs"
const fs = require("fs");
// import marked mosule as "marked"
const marked = require("marked");

// define gfm option
program.option("--gfm", "Activate GFM");
// parse CLI arguments using commander
program.parse(process.argv);
const filePath = program.args[0];

// receive CLI option arguments and apply it
const cliOptions = {
    gfm: false,
    ...program.opts(),
};

// read file async
fs.readFile(filePath, { encoding: "utf-8" }, (err, file) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
        return;
    }
    // convet .md to .html
    const html = marked(file, {
        gfm: cliOptions.gfm,
    });
    console.log(html);
})