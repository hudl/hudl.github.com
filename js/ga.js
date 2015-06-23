// GA
(function() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-64409019-1', 'auto');
  ga('send', 'pageview');

  // Outbound Link Tracking with Google Analytics
  // http://stackoverflow.com/a/14787172
  $("a").on('click',function(e){
      var url = $(this).attr("href");
      if (e.currentTarget.host != window.location.host) {
          ga('send', 'event', 'outbound', 'click', url, 0);
          if (e.metaKey || e.ctrlKey || this.target == "_blank") {
              var newtab = true;
          }
          if (!newtab) {
              e.preventDefault();
              setTimeout('document.location = "' + url + '"', 100);
          }
      }
  });
})();
