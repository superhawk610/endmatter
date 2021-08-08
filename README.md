# endmatter

Endmatter is a story format for [Twine 2](http://twinery.org/2) that's aimed at
simple JSON exports and supports passage-level meta styled after frontmatter
used by content systems like [Gatsby](https://www.gatsbyjs.com/docs/mdx/writing-pages/)
and [Jekyll](https://jekyllrb.com/docs/front-matter/). Here's what a simple
passage looks like:

```plain
You enter a dark room, lit only by lamps on either side.

What do you do?

[[Venture forth->foyer]]
[[Retreat quietly->entryway]]

---
audio: spooky.wav
actor: narrator
```

This will be exported as:

```json
{
  "pid": 1,
  "name": "doorway",
  "text": "You enter a dark room, lit only by lamps on either side.\n\nWhat do you do?",
  "links": [
    { "pid": 2, "name": "Venture forth", "link": "foyer" },
    { "pid": 3, "name": "Retreat quietly", "link": "entryway" }
  ],
  "meta": {
    "audio": "spooky.wav",
    "actor": "narrator"
  }
}
```

Endmatter supports a very lightweight version of YAML:

- key-value pairs should be listed one-per-line
- anything before the `:` is a key, anything after is the value
- nested keys aren't supported
- multiline keys/values aren't supported

## Usage

To add this to Twine, add a story format that points to

```plain
https://superhawk610.github.io/endmatter/format.js
```

## Development

To run locally

```sh
yarn start
```

This will start a development server on `http://localhost:3000`. You can point
Twine to `http://localhost:3000/format.js` and simply refresh the editor
whenever you make changes.

To build/publish, first run

```sh
yarn build
```

to generate `dist/format.js`. Add it to the `gh-pages` branch and push to
publish.

```sh
git worktree add gh-pages gh-pages
cd gh-pages
cp ../dist/format.js .
git add format.js
git commit 'updated format.js'
git push
```

## Special Thanks

This format was heavily inspired by the awesome [lazerwalker/twison](https://github.com/lazerwalker/twison),
make sure to check it out.

## License

(c) 2021 Aaron Ross. All rights reserved.
