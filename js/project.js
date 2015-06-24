(function($) {
  $('.project-left, .project-right').each(function() {
    var link = $(this).find('a[class*="project__link"]');
    var href = link.attr('href');
    link.remove();
    $(this).attr('data-href', href);
  });

  $('.project-left, .project-right').on('click', function() {
    var href = $(this).data('href');
    if (href) {
      ga && ga('send', 'event', 'outbound', 'click', href, 0);
      setTimeout('document.location = "' + href + '"', 100);
    }
  })
})($);
