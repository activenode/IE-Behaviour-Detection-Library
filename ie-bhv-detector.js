/*!
 * IE Behaviour Detection Library
 * https://github.com/activenode/IEBhvDetection
 *
 * @license: MIT license
 * @author: JvM, David Lorenz (david.lorenz@jvm.de)
 */

var IEBhvDetection = (function(){
    var _appVersion = -1;
    var _standardsVersion = 5;
    var bIsIe = false;
    
    var nvgStr = navigator.userAgent.replace(/\s/g,'');
    bIsIe = /MSIE[\d]+/.test(nvgStr);
    
    if (bIsIe) {
        var m = nvgStr.match(/MSIE(\d+(?:\.[\d]+)?)/);
        _appVersion = parseFloat(m[1]).toFixed(0);
        
        var supports = {
            ie11: function() {
                var detector = document.createElement('detector');
                try {
                    detector.style.display = 'flex';
                } catch(e) {
                    return false;
                }

                return detector.style.display==='flex';
            },
            ie10: function() {
                var detector = document.createElement('input');
                try {
                    return ('placeholder' in detector);
                } catch(e) {
                    return false;
                }
            },
            ie9: function() {
                var detector = document.createElement('canvas');
                try {
                    return (typeof detector.getContext).toLowerCase()=='function';
                } catch(e) {
                    return false;
                }
            },
            ie8: function() {
                var detector = document.createElement('div');
                //detector.style.setExpression('height', 'document.style.fontSize+1');
                var hasSetExpression = !!(detector.style.setExpression);
                
                try {
                    if (hasSetExpression) {
                        detector.style.setExpression('height', '0');
                    }
                } catch(e) {
                    if (hasSetExpression) {
                        return true;
                    }
                }
                
                return false;
            },
            ie7: function() {
                return true;
            }
        };
        
        for (var supportKey in supports) {
            var ieDocVersion = supportKey.substr(2);
            if (supports[supportKey]()) {
                _standardsVersion = ieDocVersion;
                break;
            }
        }
    }
    
    
    
    return {
        appVersion: parseInt(_appVersion),
        standardsVersion: parseInt(_standardsVersion),
        when: function(expr) {
            if (bIsIe && expr) {
                var bExprValid = false;
                var exprType = (typeof expr).toLowerCase();

                if (exprType==='string') {
                    var parsedExpression = expr.replace(/ie/g, _appVersion).replace(/doc/g, _standardsVersion);
                    var exprTester = /[\d\&\s\<\=]*/;
                    if (!exprTester.test(parsedExpression)) {
                        console.error('The given expression could not be parsed and/or is invalid', parsedExpression);
                        return false;
                    } else {
                        bExprValid = eval(parsedExpression);
                    }
                } else {
                    if (exprType!=='boolean') {
                        console.error('The given expr-Expression must be of type BOOL or a valid STRING-expression but is ['+exprType+']');
                        return false;
                    } else {
                        bExprValid = exprType;
                    }
                }
            }
            
            var returnObj = {
                then: function(cb){return this;}, 
                otherie: function(cb){return this;}, 
                noie: function(cb){return this;}, 
                ie: function(cb){return this;}
            };
            
            if (bIsIe) {
                returnObj.ie = function(cb) {cb(_appVersion,_standardsVersion); return this;};
            }
            
            if (!bExprValid) {
                if (bIsIe) {
                    //is ie but the expr is not satisfied
                    returnObj.otherie = function(cb) {cb(_appVersion,_standardsVersion); return this;};
                } else {
                    //not an ie anyway
                    returnObj.noie = function(cb) {cb(_appVersion,_standardsVersion); return this;};
                }
            } else {
                returnObj.then = function(cb) {cb(_appVersion,_standardsVersion); return this;};
            }
            
            return returnObj;
        }
    };
}());
