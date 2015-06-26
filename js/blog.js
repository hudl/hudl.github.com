(function(window, $, moment, _) {

  function renderBlogPost(entry) {
    var title = entry.find('title').text();
    var author = entry.find('author name').text();
    var published = moment(entry.find('published').text()).format('MMMM DD, YYYY');
    var content = entry.find('content').text();
    var firstParagraph = /<p>([^<]+)<\/p>/.exec(content);
    var firstParagraphContent = firstParagraph && firstParagraph.length > 1 ? firstParagraph[1] : '';

    var template = _.template(
      '<div class="blog">' +
        '<div class="blog__title">${title}</div>' +
        '<div class="blog__meta">${publishedDate} by ${author}</div>' +
        '<div class="blog__content"><%- content %></div>' +
      '</div>');
    $('.hudl-bits-posts').append($(template({ title: title, publishedDate: published, author: author, content: firstParagraphContent })));
    $('.hudl-bits-readmore').attr('href', entry.find('link').attr('href'));
  }

  var parent = $('.hudl-bits-posts');
  window.__utils.showLoading(parent);
  var url = 'http://p-foundation-oss-use1c-01.external.app.hudl.com:3005/rss-feed';
  $.ajax({ url: url })
    .done(function(result) {
      var doc = $(result);
      // Grab the first one
      var entry = doc.find('entry').first();
      renderBlogPost(entry);
    })
    .error(function(e){
      var failHtml = '<div class="blog__title">There was a problem while fetching the latest blog post. '+ 
      'Refresh the page to try again.</div>';
      $('.hudl-bits-posts').append(failHtml);
    })
    .always(function() {
      window.__utils.hideLoading(parent);
    })
})(window, $, moment, _);
