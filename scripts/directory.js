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
    });
})(window, $, moment, _);

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

(function($, _, window) {
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
      '<div class="tweet__content"><%= tweet %></div>' +
      '<%= retweetElement %>' +
    '</div>');
  var retweetTemplate = _.template(
    '<div class="tweet__retweet">' +
      '<img class="tweet__retweet-icon" src="./images/retweet.svg" alt="Icon representing this tweet has been retweeted"/>' +
      'Retweeted by <a class="tweet_retweet-link" href="https://twitter.com/hudlengineering">@HudlEngineering</a>' +
    '</div>'
  );

  function renderTweets(tweets) {
    var rowData = { cells: [] };
    _.each(tweets, function(tweet) {
      var isRetweet = tweet.retweeted_status;
      var tweetBody = isRetweet ? tweet.retweeted_status.text : tweet.text;
      var tweetBodyPlusLinks = addLinksToTweetBody(tweetBody);
      var compiled = cellTemplate({
          icon: {
            url: isRetweet ? tweet.retweeted_status.user.profile_image_url : tweet.user.profile_image_url,
            text: (isRetweet ? tweet.retweeted_status.user.name : tweet.user.name) + ' Icon'
          },
          author: {
            name: isRetweet ? tweet.retweeted_status.user.name : tweet.user.name,
            handle: isRetweet ? tweet.retweeted_status.user.screen_name : tweet.user.screen_name
          },
          tweet: tweetBodyPlusLinks,
          retweetElement: isRetweet ? retweetTemplate() : ''
      });
      rowData.cells.push(compiled);
    });

    $('.twitter-timeline').append($(rowTemplate(rowData)));
  }

  function addLinksToTweetBody(tweetBody) {
    var tokens = tweetBody.split(' ');
    var newTokens = [];
    _.each(tokens, function(token){
      if(_.startsWith(token, '@')) {
        //Push token without @ symbol
        newTokens.push('<a class="tweet-body-link" href="https://twitter.com/'+
          token.substring(1)+'">'+token+'</a>');
      }
      //Residual from retweeting
      else if(_.startsWith(token, '.@')) {
        //Push token without .@ symbols
        newTokens.push('<a class="tweet-body-link" href="https://twitter.com/'+
          token.substring(2)+'">'+token+'</a>');
      }
      else if(_.startsWith(token, '#')) {
        newTokens.push('<a class="tweet-body-link" href="https://twitter.com/hashtag/'+
          token.substring(1)+'">'+token+'</a>');
      }
      else if(_.startsWith(token, 'http')) {
        //Push entire link
        newTokens.push('<a class="tweet-body-link" href="'+token+'">'+token+'</a>');
      }
      else {
        newTokens.push(token);
      }
    });

    return newTokens.join(" ");
  }

  var parent = $('.twitter-timeline');
  window.__utils.showLoading(parent);
  var url = 'http://p-foundation-oss-use1c-01.external.app.hudl.com:3005/twitter';
  $.ajax({ url: url })
    .done(function(tweets) {
      parent.empty();
      _.each(_.chunk(tweets, 2), renderTweets);

      // Add a view more at the end
      $('.twitter-timeline .tweets').last().append($(
        '<div class="tweet grid-cell grid-cell__verticallyAligned">' +
          '<a class="tweet__viewmore" href="https://twitter.com/hudlengineering">' +
            'View More Tweets &#8594;' +
          '</a>' +
        '</div>'));

      window.__utils.replaceSVGs(parent);
      window.__utils.captureLinks();
    })
    .fail(function(e){
      var failHtml = '<h3 class="center">There was a problem while fetching tweets. Refresh the page to'+
      ' try again.</h3>';
      $('.twitter-timeline').append(failHtml);
    })
    .always(function() {
      window.__utils.hideLoading(parent);
    });
})($, _, window);

// Web fonts
(function(document) {
  WebFontConfig = {
    google: {
      families: ['Oswald', 'Open Sans:300,700'],
    }
  };
  var wf = document.createElement('script'), s = document.scripts[0];
  wf.src = 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.3/webfontloader.js';
  s.parentNode.insertBefore(wf, s);
})(document);
