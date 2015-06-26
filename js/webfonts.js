// Web fonts
(function(document) {
  WebFontConfig = {
    google: {
      families: ['Oswald', 'Open Sans:300,700'],
    }
  };
  var wf = document.createElement('script'), s = document.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
  s.parentNode.insertBefore(wf, s);
})(document);
