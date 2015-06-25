(function($) {
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
  }
})($);
