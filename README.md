# IE Behaviour Detection Library

This library is provided since *IE Conditional Comments* are not sufficient anymore. 
E.g. when a user sets up the Internet Explorer to be run at Version 10 with the Doc-Version of IE9 you can neither use IE10-CSS-Hacks nor IE9 Conditional Comments - a dilemma.
This library provides a very new and simple way to check for both versions!


## Documentation
This documentation is described by the code samples below.

### Check if it is IE10 with IE9 HTML Standards/Support
  IEBhvDetection.when('ie==10 && doc==9').then(function () {
    alert('Wow, stop this IE10! Dont be a liar, you act as IE9!');
  }).otherwise(function(ieVersion, docVersion){
    alert('Expression was not true');
    console.log(ieVersion, docVersion);
  });
