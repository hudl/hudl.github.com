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
        '<div class="tweet__meta">${author.name} <a class="twitter__handle"'+
        'href="https://twitter.com/${author.handle}">@${author.handle}</a>' +
        '<svg class="tweet__retweet-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21" height="12" viewBox="0 0 21 12" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(-552.000000, -1928.000000)" fill="#000000"> <path d="M556.22 1940C555.79 1940 555.44 1939.66 555.44 1939.24L555.44 1933.02 552 1933.02 556.67 1928.05 561.35 1933.02 557.9 1933.02 557.9 1937.6 561.6 1937.6 564.03 1940 556.22 1940 556.22 1940ZM573 1934.98L569.56 1934.98 569.56 1928.76C569.56 1928.34 569.21 1928 568.78 1928L560.97 1928 563.4 1930.4 567.09 1930.4 567.09 1934.98 563.65 1934.98 568.33 1939.95 573 1934.98 573 1934.98Z"/> </g> </g> </svg> ' +
        '</div>' +
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
          retweetImageUrl: tweet.retweeted_status ? '/images/retweet.svg' : '',
          tweet: tweet.retweeted_status ? tweet.retweeted_status.text : tweet.text
      });
      rowData.cells.push(compiled);
    });

    $('.twitter-timeline').append($(rowTemplate(rowData)));
  }
  var url = 'http://p-foundation-oss-use1c-01.external.app.hudl.com:3005/twitter';
  $.ajax({ url: url })
    .done(function(tweets) {
      $('.twitter-timeline').empty();
      _.each(_.chunk(tweets, 2), renderTweets);

      // Add a view more at the end
      $('.twitter-timeline .tweets').last().append($(
        '<div class="tweet grid-cell">' +
          '<a class="tweet__viewmore" href="https://twitter.com/hudlengineering">' +
            'View More Tweets &#8594;' +
          '</a>' +
        '</div>'));
    });
})($, moment, _);
