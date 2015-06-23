# Hudl OSS Oh Yes Yes

### How to run
1. Install npm and node from here: https://nodejs.org/download/
2. Clone this repo into some directory (this directory will be referred to as `$REPO`)
3. Run `npm install` from the root of `$REPO` to fetch all dependencies
4. Start the local webserver by running `npm run start-server`
5. ~~To compile stylus files into css, you can run `npm run compile-css` to compile once, or `npm run watch-css` to compile as changes are made.~~
6. ~~Open `index.html` in a browser of your choice (you can also run `npm run watch-css` which will start a webserver on `localhost:3000` with the site if you prefer)~~

### Compiling CSS
#### Why
`index.html` contains a reference to `<link rel="stylesheet" href="css/directory.css">` which is a compiled resource.
#### How
Run `npm run compile-css` to do a single compile. To watch for changes and compile on the fly, simply follow the instructions to start the local web server.

### Compiling JS
#### Why
`index.html` contains a reference to `<script src="scripts/directory.js"></script>` which is a compiled resource.
#### How
Run `npm run compile-js` to do a single compile. To watch for changes and compile on the fly, simply follow the instructions to start the local web server.

### Adding CSS
Simply add a new `.styl` file in the `styles` directory and the `gulp` tasks will automatically detect and include it

### Adding JS
Simply add a new `.js` file in the `js` directory and the `gulp` tasks will automatically detect and include it. FYI, there is currently no dependency management
