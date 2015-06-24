(function($, moment, _) {
  function renderTweets(tweets) {
    var rowTemplate = _.template(
      '<div class="grid-row">' +
        '<div class="tweets">' +
          '<% _.forEach(cells, function(cell) { %><%= cell %><% }); %>' +
        '</div>' +
      '</div>');
    var cellTemplate = _.template(
      '<div class="tweet grid-cell">' +
        '<div class="tweet__icon"><img src="${icon.url}" alt="${icon.text}"/></div>' +
        '<div class="tweet__meta">${author.name} @${author.handle}</div>' +
        '<div class="tweet__content"><%- tweet %></div>' +
      '</div>');

    var rowData = { cells: [] };
    _.each(tweets, function(tweet) {
      var compiled = cellTemplate({
          icon: {
            url: tweet.retweeted_status ? tweet.retweeted_status.user.profile_image_url : tweet.user.profile_image_url,
            text: (tweet.retweeted_status ? tweet.retweeted_status.user.name : tweet.user.name) + ' Icon'
          },
          author: {
            name: tweet.retweeted_status ? tweet.retweeted_status.user.name : tweet.user.name,
            handle: tweet.retweeted_status ? tweet.retweeted_status.user.screen_name : tweet.user.screen_name
          },
          tweet: tweet.text
      });
      rowData.cells.push(compiled)
    });

    $('.twitter-timeline').append($(rowTemplate(rowData)));
  }
  var url = 'http://p-foundation-oss-use1c-01.external.app.hudl.com:3005/twitter';
  $.ajax({ url: url })
    .done(function(tweets) {
      $('.twitter-timeline').empty();
      _.each(_.chunk(tweets, 2), renderTweets);
    });
})($, moment, _);
