// import marked mosule as "marked"
const marked = require("marked");

module.exports = (markdown, cliOptions) => {
    // convet .md to .html
    return marked(markdown, {
        gfm: cliOptions.gfm,
    });
};