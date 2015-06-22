// Embed twitter
(function() {
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
})();

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
