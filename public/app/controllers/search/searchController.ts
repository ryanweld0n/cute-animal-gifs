/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../services/giphyAPISearchService.ts" />
/// <reference path="../../util.ts" />
'use strict';

class SearchController {
    static $inject = ['GiphyAPISearchService', '$uibModal'];
    //static $inject = ['GiphyAPISearchService'];

    private searchPhrase: string;
    private searchResult: any;
    private numberOfPages: number;
    private currentPage: number;
    private pages: number[] = [];

    constructor(
        private GiphyAPISearchService: GiphyAPISearchService,
        private $uibModal: ng.ui.bootstrap.IModalService
    ){}

    private searchFor(searchPhrase: string): void{
        this.searchPhrase = searchPhrase;

        this.GiphyAPISearchService.Search(searchPhrase)
            .then((result) => {
                this.searchResult = result;
                this.createPagination();

            }, (e) => {
               console.log('error fetching ' , searchPhrase); //todo: display message on screen
            });
    }

    private openModal(gif: any): void{

        let modalInstance = this.$uibModal.open({
                templateUrl: '/app/controllers/gifModal/gifModal.html',
                controller: 'GifModalController',
                controllerAs: 'vm',
                resolve: {
                    passedGifData: gif
                }
            });
    }

    private createPagination(page: number = 0): void {
        this.currentPage = page;
        this.numberOfPages = Math.ceil(this.searchResult.pagination.total_count / this.GiphyAPISearchService.pageSize);
        this.pages = [];

        //first 3 pages
        for(let i = 0; i < 3; i++){
            this.pages.push(i);
        }

        //middle 3 pages
        if(this.currentPage > 2 && this.currentPage < this.numberOfPages - 3){
            for(let i = this.currentPage - 1; i < this.currentPage+2; i++){
                this.pages.pushUnique(i);
            }
        }

        //last 3 pages
        for(let i = this.numberOfPages-3; i < this.numberOfPages; i++){
            this.pages.pushUnique(i);
        }
    }

    private loadPage(page: any): void {
        if(page === 'prev') { page = this.currentPage - 1; }
        if(page === 'next') { page = this.currentPage + 1; }

        this.GiphyAPISearchService.LoadPage(page)
            .then((result) => {
                this.searchResult = result;
                this.createPagination(page);
            }, (e) => {
                console.log('error fetching next page' ); //todo: display message on screen
            });
    }
}

angular.module('gifSearchApp').controller('SearchController', SearchController);
