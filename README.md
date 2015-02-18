# IE Behaviour Detection Library

This library is provided since *IE Conditional Comments* are not sufficient anymore. 
E.g. when a user sets up the Internet Explorer to be run at Version 10 with the Doc-Version of IE9 you can neither use IE10-CSS-Hacks nor IE9 Conditional Comments - a dilemma.
This library provides a very new and simple way to check for both versions!


## Documentation
This documentation is described by the code samples below.

### Check for IE10 with IE9 HTML Standards/Support activated

    IEBhvDetection.when('ie==10 && doc==9').then(function () {
      alert('Wow, stop this IE10! Dont be a liar, you act as IE9!');
    });
    
### Check for real (!) IE7

    IEBhvDetection.when('ie==7 && doc==7').then(function () {
      alert('Seems to be a real IE7 with no crazy compat mode on.');
    });
    
### Check IE9 standards and below and do something else for everything above

    IEBhvDetection.when('doc<=9').then(function (ieVersion, stdVersion) {
        if (ieVersion >= 10) {
            alert('Why do you use <=9 Standards when you are able to use IE10 Standards?');
        } else {
            alert('Hey you lazy user. Update your browser to at least IE10 - please!');
        }
    })
        .otherie(function(){
            alert('Okay, so you\'re using IE, but not a one with doc <= 9');
        })
        .noie(function(){
            alert('Good one. We hate IE too');
        });
