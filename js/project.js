(function($, window) {
  $('.project .grid-cell')
    .each(function() {
      var link = $(this).find('a[class*="project__link"]');
      var href = link.attr('href');
      link.remove();
      $(this).attr('data-href', href);
    })
    .on('click', window.__utils.captureLink);
})($, window);
