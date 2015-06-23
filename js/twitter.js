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
/*
// Embed twitter
(function(d, w) {

  w.twitterLoaded = function(data) {
    var div = document.createElement('div');
    div.innerHTML = data.body;
    console.log(div);
  };

  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://cdn.syndication.twimg.com/widgets/timelines/613066514640441345?&amp;lang=en&amp;callback=twitterLoaded&amp;suppress_response_codes=true&amp;rnd=0.4282359848730266';
  head.appendChild(script);
})(document, window);
*/
