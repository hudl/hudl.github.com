(function($, moment, _) {

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

  var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22http%3A%2F%2Fpublic.hudl.com%2Fbits%2Ffeed%22';
  $.ajax({ url: url })
    .done(function(result) {
      var doc = $(result);
      // Grab the first one
      var entry = doc.find('entry').first();
      renderBlogPost(entry);
    });
})($, moment, _);
