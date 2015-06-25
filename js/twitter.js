(function($, _, window) {
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
        '<div class="tweet__meta">${author.name} ' +
          '<a class="twitter__handle" href="https://twitter.com/${author.handle}">@${author.handle}</a>' +
        '</div>' +
        '<div class="tweet__content"><%- tweet %></div>' +
        '<%= retweetElement %>' +
      '</div>');
    var retweetTemplate = _.template(
      '<div class="tweet__retweet">' +
        '<img class="tweet__retweet-icon" src="./images/retweet.svg" alt="Icon representing this tweet has been retweeted"/>' +
        'Retweeted by <a class="tweet_retweet-link" href="https://twitter.com/hudlengineering">@HudlEngineering</a>' +
      '</div>'
    );

    var rowData = { cells: [] };
    _.each(tweets, function(tweet) {
      var isRetweet = tweet.retweeted_status;
      var compiled = cellTemplate({
          icon: {
            url: isRetweet ? tweet.retweeted_status.user.profile_image_url : tweet.user.profile_image_url,
            text: (isRetweet ? tweet.retweeted_status.user.name : tweet.user.name) + ' Icon'
          },
          author: {
            name: isRetweet ? tweet.retweeted_status.user.name : tweet.user.name,
            handle: isRetweet ? tweet.retweeted_status.user.screen_name : tweet.user.screen_name
          },
          tweet: isRetweet ? tweet.retweeted_status.text : tweet.text,
          retweetElement: isRetweet ? retweetTemplate() : ''
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

      window.__utils.replaceSVGs($('.twitter-timeline'));
    });
})($, _, window);
