# 11ty-shortcode-gist

Testing how to embed GitHub gists into a blog using shortcodes.


```js
// .eleventy.js
eleventyConfig.addShortcode("gist", (opts = {}) => {
  if (!opts.username || !opts.gistId) {
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
```

To use the shortcode, we can call the `{% gist %}` shortcode and pass a `username`, and `gistId` parameter. If you only want to embed a single file from the gist, you can pass an optional `file` parameter.

```njk
---
title: Testing embedding a gist via a script tag
username: pdehaan
gistId: 2230cba6b580e11d2a02d220723748d7
---

{% for file in ["search.js"] %}
  {%- gist username=username,
      gistId=gistId,
      file=file -%}
{% endfor %}
```

If you don't want to embed the GitHub username in the templates, you can set a default in shortcode itself, as seen in the following snippet:

```js
eleventyConfig.addShortcode("gist", (opts = {}) => {
  opts = Object.assign({ username: "pdehaan" }, opts);
  if (!opts.gistId) {
    return;
  }
  // ...
};
```

Now, you don't need to pass the `username` in the templates, although you can still pass a `username` if you want to override the default value.
