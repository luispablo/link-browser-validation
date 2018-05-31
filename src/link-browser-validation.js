(function () {
  var BROWSERS = ["MSIE", "Edge", "Firefox", "Chrome", "Opera", "Safari"];

  var DEFAULT_BLOCK_MSG = "Sorry, your browser is not supported";
  var DEFAULT_WARN_MSG = "WARNING: Your browser is not supported";
  var DEFAULT_CONFIRM_MSG = "WARNING: Your browser is not supported. Continue anyway?";

  // From https://stackoverflow.com/questions/17907445/how-to-detect-ie11
  var isMSIE11 = function isMSIE11 () {
    return !(window.ActiveXObject) && "ActiveXObject" in window;
  };

  var detectBrowser = function detectBrowser () {
    if (isMSIE11()) return "MSIE";

    var i;
    var userAgent = window.navigator.userAgent;
    for (i = 0; i < BROWSERS.length && userAgent.indexOf(BROWSERS[i]) === -1; i++);
    return BROWSERS[i];
  };

  var isBrowserInList = function isBrowserInList (currentBrowserKey, browsersList) {
    var i;
    var browserFoundInList = false;
    for (i = 0; i < browsersList.length; i++) browserFoundInList = browserFoundInList || browsersList[i].trim() === currentBrowserKey;
    return browserFoundInList;
  };

  var continueToDestination = function continueToDestination (href, inNewWindow) {
    return function () {
      if (inNewWindow) window.open(href);
      else location.href = href;
    };
  };

  var handlers = {
    doBlock: function (message) { 
      alert(message); 
    },
    doWarn: function (message, callback) {
      alert(message);
      callback();
    },
    doConfirm: function (message, callback) {
      if (confirm(message)) callback();
    }
  };
  
  var prepareLinks = function prepareLinks () {
    var link, blockBrowsers, warnBrowsers, confirmBrowsers, customMessage;
    var links = document.getElementsByTagName("a");
    var currentBrowserKey = detectBrowser();

    for (var i = 0; i < links.length; i++) {
      link = links.item(i);
      blockBrowsers = link.getAttribute("data-browser-block") && link.getAttribute("data-browser-block").split(",");
      warnBrowsers = link.getAttribute("data-browser-warn") && link.getAttribute("data-browser-warn").split(",");
      confirmBrowsers = link.getAttribute("data-browser-confirm") && link.getAttribute("data-browser-confirm").split(",");

      if (blockBrowsers && isBrowserInList(currentBrowserKey, blockBrowsers)) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          customMessage = this.getAttribute("data-browser-msg") || DEFAULT_BLOCK_MSG;
          handlers.doBlock(customMessage);
        });
      } else if (warnBrowsers && isBrowserInList(currentBrowserKey, warnBrowsers)) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          customMessage = this.getAttribute("data-browser-msg") || DEFAULT_WARN_MSG;
          handlers.doWarn(customMessage, continueToDestination(this.href, this.target === "_blank"));
        });
      } else if (confirmBrowsers && isBrowserInList(currentBrowserKey, confirmBrowsers)) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          customMessage = this.getAttribute("data-browser-msg") || DEFAULT_CONFIRM_MSG;
          handlers.doConfirm(customMessage, continueToDestination(this.href, this.target === "_blank"));
        });
      }
    }
  };

  // Main object
  var lbValidation = {
    handlers: handlers,
    prepareLinks: prepareLinks
  };

  window.lbValidation = lbValidation; // Export
  lbValidation.prepareLinks(); // Add listeners to existing links
})();
