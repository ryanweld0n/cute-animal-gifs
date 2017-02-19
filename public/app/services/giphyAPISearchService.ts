/// <reference path="../../typings/angularjs/angular.d.ts" />

'use strict';

class GiphyAPISearchService {

    static $inject = ['$q', '$http'];

    private searchUrl: string = 'http://api.giphy.com/v1/gifs/search?q=';
    private apiKey: string = 'dc6zaTOxFJmzC';
    public phrase: string;
    public pageSize: number = 15;

    constructor(private $q: ng.IQService, private $http: ng.IHttpService){}

    public Search(phrase: string): ng.IPromise<{}> {
        let q = this.$q.defer();

        this.phrase = phrase;

        this.$http({
            method: 'GET',
            url: this.searchUrl + phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize
        }).success((result) =>{
            q.resolve(result);
        }).error((e) =>{
            q.reject(e);
        });

        return q.promise;
    }

    public LoadPage(page: number): ng.IPromise<{}> {
        let q = this.$q.defer();

        let offset = page  * this.pageSize;

        this.$http({
            method: 'GET',
            url: this.searchUrl + this.phrase + '&api_key=' + this.apiKey + '&limit=' + this.pageSize + '&offset=' + offset
        }).success((result) =>{
            q.resolve(result);
        }).error((e) =>{
            q.reject(e);
        });

        return q.promise;
    }
}

angular.module('gifSearchApp').service('GiphyAPISearchService', GiphyAPISearchService)
