/// <reference path="../../typings/angularjs/angular.d.ts" />

'use strict';

class Capitalize {
    static $inject = [];

    static filter(){
        return (input: string) => {
            if(typeof input === 'string'){
                return input.charAt(0).toUpperCase() + input.slice(1);
            }else{
                return;
            }
        }
    }
}

angular.module('gifSearchApp').filter('capitalize', Capitalize.filter);
