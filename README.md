# link-browser-validation

Lightweight and zero dependency JS library to add browser validation to HTML anchor elements, via data attributes.

## How to use it

If you want any link in your HTML to validate the user browser before allowing them to continue, you can do so by simply adding some special **data** attributes to them.

```html
<!doctype html>
<html>
  <body>
    <h1>Browser detection sample</h1>
    <br/>
    <a href="http://microsoft.com" target="_blank" data-browser-block="Chrome">
      Microsoft
    </a>
    <br/><br/>
    <a href="http://google.com" target="_blank" data-browser-warn="Firefox">
      Google
    </a>
    <br/><br/>
    <a href="http://mozilla.org" target="_blank" data-browser-confirm="MSIE, Edge">
      Mozilla
    </a>

    <script src="js/browser-validation.min.js"></script>
  </body>
</html>
```

### Blocking browser

If you want to **prohibit** the navigation with certain browsers use the attribute ```data-browser-bock```. It will alert the user of the block set for the specified browsers, and won't continue to the link destination.

```html
  <a href="http://microsoft.com" target="_blank" data-browser-block="Chrome">
    Microsoft
  </a>
```

### Warning about certain browsers

If you only want to _advice_ of the use of certain browsers, use the ```data-browser-warn``` attribute. This property will display a warning to the user, and when the message is read and an OK button pressed the browser will continue to its original destination.

```html
  <a href="http://google.com" target="_blank" data-browser-warn="Firefox">
    Google
  </a>
```

### Confirming navigation in certain browsers

If you want to go one step further, you can warn the users, and ask them to confirm to continue despite your warning. You can do so using the ```data-browser-confirm``` attribute.

```html
  <a href="http://mozilla.org" target="_blank" data-browser-confirm="MSIE, Edge">
    Mozilla
  </a>
```

### Supported browsers

These are the supported browsers, and its corresponding keys to use in the data attributes:

Browser           | key
------------------|---------
Internet Explorer | MSIE
Microsoft Edge    | Edge
Mozilla Firefox   | Firefox
Google Chrome     | Chrome
Opera             | Opera
Safari            | Safari

## Customizing it

### Messages

When alerting a user of an invalid browser, in any form of validation, the module will issue a default message text, in english.

If you want to change the text, or use other language, you can make use of the ```data-browser-msg``` attribute.

```html
  <a href="http://google.com" data-browser-block="MSIE" data-browser-msg="Non puoi usare Internet Explorer qui">
      Microsoft
  </a>
```

### Alerts and confirm handlers

By default, this module will pop a JS ```alert()``` window to display the blocking and warning messages, and its counterpart ```confirm()``` in the confirming case.

You may want to use a better alternative to such methods, a custom library to pop a dialog or other similar thing. In this case you have to customize the functions that handle the alerting events.

```html
  ...
  <script src="./browser-validation.js"></script>
  <script>
    // To override the handlers, alerting with another message, and leaving the real message in the console.
    window.lbValidation.handlers.doBlock = function (msg) {
      console.log(msg);
      alert("DON'T GO THERE!");
    };
    window.lbValidation.handlers.doWarn = function (msg, callback) {
      console.log(msg);
      alert("You shouldn't do this...");
      callback(); // Don't forget this!
    };
    window.lbValidation.handlers.doConfirm = function (msg, callback) {
      console.log(msg);
      if (confirm("Are you sure, man...?")) {
        callback();
      } else {
        alert("Great choice!");
      }
    };
  </script>
</body>
...
```
Beware that when overriding the warning and confirm options, **you** are responsible for invoking the callback function, which will continue to the link original destination.

## Author

@luispablo
