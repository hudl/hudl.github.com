(function($, window) {
  window.__utils = {};
  window.__utils.replaceSVGs = function($el) {
    var deferreds = [];
    var svgs = $el ? $el.find('img[src$=".svg"]') : $('img[src$=".svg"]');
    // jhofker's svg replacer
    svgs.each(function () {
      var $img = $(this);
      var imgId = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgUrl = $img.attr('src');
      var deferred = $.get(imgUrl, function (img) {
        // Get the SVG tag, ignore the rest
        var $svg = $(img).find('svg');
        // Add replaced image's ID to the new SVG
        if (typeof imgId !== 'undefined') {
          $svg = $svg.attr('id', imgId);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        // Replace image with new SVG
        $img.replaceWith($svg);
      }, 'xml');

      deferreds.push(deferred);
    });
    $.when.apply($, deferreds).done(/*callback*/);
  };
  window.__utils.showLoading = function($el) {
    $el.empty().append($('<div class="loader"></div>'));
  };
  window.__utils.hideLoading = function($el) {
    $el.find('.loader').remove();
  };
  // Outbound Link Tracking with Google Analytics
  // http://stackoverflow.com/a/14787172
  window.__utils.captureLink = function(e) {
    var url = $(this).attr('href') || $(this).data('href');
    if (!url) return;
    var newtab = false;
    if (e.currentTarget.host != window.location.host) {
        ga('send', 'event', 'outbound', 'click', url, 0);
        if (e.metaKey || e.ctrlKey || this.target == "_blank") {
          newtab = true;
        }
        if (!newtab) {
          e.preventDefault();
          setTimeout('document.location = "' + url + '"', 100);
        }
    }
  };
  window.__utils.captureLinks = function() {
    $('a').off('click', window.__utils.captureLink).on('click', window.__utils.captureLink);
  };
})($, window);

// GA
(function(window) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-64409019-1', 'auto');
  ga('send', 'pageview');

  window.__utils.captureLinks();
})(window);

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
