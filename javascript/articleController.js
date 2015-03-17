TWD.articleController = {}
TWD.articleController.articleEndpoint = {};

TWD.articleController.init = function(){
    TWD.articleController.articleEndpoint = '/articles/top/'; //set the default
    TWD.articleController.whichArticles();
    TWD.articleController.articlesLoaded = false;
    TWD.articleModel.loadArticles();
};

TWD.articleController.hasHistoryAPI = function(){
    return !!(window.history && history.pushState);
};

TWD.articleController.updateUrl = function(pageName){
    if (TWD.articleController.hasHistoryAPI()){
        var pageState = {};
        history.pushState(pageState, "null", pageName);
    };
};

TWD.articleController.whichArticles = function(){
    var navigation = document.getElementsByTagName('nav'),
        navTop = $('#top'),
        navMasterworks = $('#masterworks'),
        navStrongHold = $('#stronghold'),
        navElves = $('#elves'),
        navBeasts = $('#beasts');

    navTop.on('click', function(e){
        console.log('click on navTop');
        console.log(this);
        e.preventDefault();
        var state = this.getAttribute('data-article-nav');
        TWD.articleController.updateUrl(state);
        TWD.articleController.articleEndpoint = '/articles/top/';
        TWD.articleModel.loadArticles();
    });
    navMasterworks.on('click', function(e){
        console.log('click on navMasterworks');
        e.preventDefault();
        var state = this.getAttribute('data-article-nav');
        TWD.articleController.updateUrl(state);
        TWD.articleController.articleEndpoint = '/articles/masterworks/';
        TWD.articleModel.loadArticles();
    });
    navStrongHold.on('click', function(e){
        console.log('click on navStrongHold');
        e.preventDefault();
        var state = this.getAttribute('data-article-nav');
        TWD.articleController.updateUrl(state);
        TWD.articleController.articleEndpoint = '/articles/strongholds/';
        TWD.articleModel.loadArticles();
    });
    navElves.on('click', function(e){
        console.log('click on navElves');
        e.preventDefault();
        var state = this.getAttribute('data-article-nav');
        TWD.articleController.updateUrl(state);
        TWD.articleController.articleEndpoint = '/articles/elves/';
        TWD.articleModel.loadArticles();
    });
    navBeasts.on('click', function(e){
        console.log('click on navBeasts');
        e.preventDefault();
        var state = this.getAttribute('data-article-nav');
        TWD.articleController.updateUrl(state);
        TWD.articleController.articleEndpoint = '/articles/beasts/';
        TWD.articleModel.loadArticles();
    });
}
