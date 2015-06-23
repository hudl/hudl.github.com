# Hudl OSS Oh Yes Yes

### How to run
1. Install npm and node from here: https://nodejs.org/download/
2. Clone this repo into some directory (this directory will be referred to as `$REPO`)
3. Run `npm install` from the root of `$REPO` to fetch all dependencies
4. To compile stylus files into css, you can run `npm run compile-css` to compile once, or `npm run watch-css` to compile as changes are made.
5. Open `index.html` in a browser of your choice (you can also run `npm run watch-css` which will start a webserver on `localhost:3000` with the site if you prefer)