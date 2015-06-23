// Web fonts
(function(document) {
  WebFontConfig = {
    custom: {
      families: ['Trade Gothic'],
      urls: ['fonts.css']
    }
  };
  var wf = document.createElement('script'), s = document.scripts[0];
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
  s.parentNode.insertBefore(wf, s);
})(document);
