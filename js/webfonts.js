// Web fonts
(function(document) {
  WebFontConfig = {
    google: {
      families: ['Oswald', 'Open Sans:300,700']
    }
  };
  var wf = document.createElement('script'), s = document.scripts[0];
  wf.src = 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.3/webfontloader.js';
  s.parentNode.insertBefore(wf, s);
})(document);
