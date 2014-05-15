/*
 * An AngularJS Object-Based Localization Service
 *
 * Written by Kevin Ready
 *
 */
'use strict';

var il8nObj=angular.module('il8nObj', [])
    .factory('il8nObjFactory', ['$http', '$rootScope', '$window', '$filter', 
        function ($http, $rootScope, $window, $filter) {
            var factory = {
                _lang:'',
                defaultBadText: '',
                defaultSourceURL: 'locale_en.json',
                lang:function(){
                    return $window.navigator.userLanguage || $window.navigator.language
                },
                sourceFiles:[],
                source:{},
                getSource:function(whichURL){
                    if(this.source[whichURL]){
                        return this.source[whichURL];
                    }else{
                        return [];
                    };
                },
                setLoaded:function(whichURL, toWhat){
                    this.sourceFiles[whichURL]=toWhat;
                },
                setSource:function(whichURL, whichSource){
                    this.source[whichURL]=whichSource;
                },
                lang2:function () {
                    return(this.lang().substring(0,2));
                },
                findChildObjString:function(data, object, property, subProp, subPropProp){
                    if(typeof(data[property])=="string"){
                        return(data[property]);
                    }else if((typeof(data[property])=="object") && subProp && subPropProp){
                        return(data[property][subProp][subPropProp]);
                    }else if((typeof(data[property])=="object") && subProp){
                        return(data[property][subProp]);
                    }else{
                        return "--";
                    }
                },
                initLocalSource:function (url) {
                    console.log("url=" + url);
                    $http({ method:"GET", url:url, cache:false })
                    .success(function (data) {
                        factory.setSource(url, data);
                        factory.setLoaded(url, true);
                        $rootScope.$broadcast('factorySourcesUpdates');
                    }).error(function () {
                        if(! factory.source){
                            url=factory.defaultSourceURL;
                            $http({ method:"GET", url:url, cache:false })
                            .success(function (data) {
                                factory.setSource(url, data);
                                factory.setLoaded(url, true);
                                $rootScope.$broadcast('factorySourcesUpdates');
                            })
                        }
                    });
                },
                isLoaded:function (whichURL) {
                    return(this.sourceFiles[whichURL]);
                },
                getLocalObjString:function (args) {
                    var file=args[0];
                    var object=args[1];
                    var property=args[2];
                    var subProp= (args.length>3) ? args[3] : "";
                    var subPropProp = (args.length>4) ? args[4] : "";
                    var result = '',
                    url = file + "_" + this.lang2() + '.json';
                    if (factory.getSource(url).length==0 && ! factory.isLoaded(url)) {
                        factory.initLocalSource(url);
                        factory.setLoaded(url,true);
                        return result;
                    }
                    if (factory.source !== []) {
                        var entry = $filter('filter')(factory.getSource(url),{key:object})[0];
                        if ((entry !== null) && (entry != undefined)) {
                            if(typeof(entry.value) == "string"){
                                result = entry.value;
                            }else{
                                result=this.findChildObjString(entry.value,object, property, subProp, subPropProp);
                            }
                        }
                    }
                    return(result);
                }
            };
            return factory;
        } 
        
    ]
)

    .controller('il8nObjCtrl', ['il8nObjFactory', function ($scope) {
        
    }])
    .filter('il8nObj', ['il8nObjFactory', function (factory) {
        return function (file) {
            return factory.getLocalObjString(arguments);
        };
    }])
;
