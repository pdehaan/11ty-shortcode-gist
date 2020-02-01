const del = require("del");

module.exports = eleventyConfig => {
  const dir = {
    input: "./src",
    output: "./www"
  };

  // Clean the output directory when building.
  del.sync(dir.output);

  eleventyConfig.addShortcode("gist", (opts = {}) => {
    opts = Object.assign({ username: "pdehaan" }, opts);
    if (!opts.gistId) {
      return;
    }
    const url = new URL(
      `/${opts.username}/${opts.gistId}.js`,
      "https://gist.github.com"
    );
    if (opts.file) {
      url.searchParams.set("file", opts.file);
    }
    return `<script src="${url.href}"></script>`;
  });

  return {
    dir
  };
};
