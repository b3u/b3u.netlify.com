const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {

    const md = require("./eleventy/markdownIt");
    eleventyConfig.setLibrary('md', md);

    // filters
    require("./eleventy/filters")(eleventyConfig, md);

    const wm = require("./eleventy/webmentions");
    eleventyConfig.addFilter("getMentionsForUrl", wm);

    // Collections
    const collections = ['posts', 'notes', 'snippets'];

    collections.forEach(collectionName => {
        eleventyConfig.addCollection(collectionName, function(collectionObject) {
            return collectionObject.getFilteredByGlob(`src/${collectionName}/**/*.md`)
        })
    })

    // Transforms
    eleventyConfig.addTransform('htmlmin', function(content) {
        if(this.outputPath.endsWith(".html")) {
            return htmlmin.minify(content, {
                collapseWhitespace: true
            })
        }
        return content;
    })

    eleventyConfig.setBrowserSyncConfig({
        online: false
    })

    // Important, since the gitignore lists "src/notes/**/*"
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addWatchTarget("src/sass/**/*.scss");

    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy({'.cache/thumbnails': 'assets/uploads'});
    eleventyConfig.addPassthroughCopy("src/keybase.txt");

    return {
        dir: {
            input: "src",
            output: "dist",
            layouts: "layouts",
            includes: "includes",
            data: "data"
        },
        passthroughFileCopy: true
    };
};
