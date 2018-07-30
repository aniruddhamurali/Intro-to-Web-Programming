var scriptTag = document.createElement('script');
scriptTag.src = "https://cdn.jsdelivr.net/g/prism@1.3.0(prism.js+components/prism-css.min.js+components/prism-javascript.min.js+components/prism-markup.min.js)";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

var linkTag = document.createElement('link');
linkTag.rel = "stylesheet"
linkTag.href = "https://cdn.jsdelivr.net/prism/1.3.0/themes/prism.css";
var firstLinkTag = document.getElementsByTagName('link')[0];
firstLinkTag.parentNode.insertBefore(linkTag, firstLinkTag);

function loadCode() {
  if (typeof Prism !== 'undefined') {
    $('code').each(function(i, el) {
      var self = this;
      var path = $(self).data('path');

      if (path.match(/css$/)) {
        $(self).addClass('language-css');
      } else if (path.match(/html$/)) {
        $(self).addClass('language-markup');
      } else {
        $(self).addClass('language-none');
      }

      $.get({
        url: path,
        success: function(response) {
          $(self).html(response.replace(/\</g, '&lt;').replace(/\>/g, '&gt;'));
          Prism.highlightAll();
        }
      });
    });
  } else {
    setTimeout(loadCode, 100);
  }
}

loadCode();
