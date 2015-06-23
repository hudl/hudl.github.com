(function($) {
  $('.project').each(function() {
    var link = $(this).find('a[class*="project__link"]');
    var href = link.attr('href');
    link.remove();
    $(this).attr('data-href', href);
  });

  $('.project').on('click', function() {
    var href = $(this).data('href');
    if (href) {
      window.open(href);
    }
  })
})($);
