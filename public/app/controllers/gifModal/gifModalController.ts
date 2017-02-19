/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />

'use strict';

class GifModalController {
    static $inject = ['$uibModalInstance', 'passedGifData'];

    private searchPhrase: string;
    private searchResult: any;

    constructor(
        private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
        private passedGifData: any
    ){}

    private cancel(): void {
        this.$uibModalInstance.dismiss();
    }

}

angular.module('gifSearchApp').controller('GifModalController', GifModalController);
