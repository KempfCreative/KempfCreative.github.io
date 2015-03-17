TWD.articleModel = {}

TWD.articleModel.loadArticles = function(){
    var articleTargets = document.querySelectorAll('[data-article-target]');

    if(!TWD.articleController.articlesLoaded){
        TWD.articleView.articlesLoaded = true;
        $(articleTargets).empty();
        for (var i = 1; i <= articleTargets.length; i++) {
            (function(i){
                $.ajax({
                    type: 'GET',
                    url: TWD.articleController.articleEndpoint + 'mainArticle' + i + '.json',
                    cache: false,
                    success: function(data) {
                        $(articleTargets[i-1]).append(data.success.articleImage);
                        $(articleTargets[i-1]).append(data.success.articleTime);
                        $(articleTargets[i-1]).append(data.success.articleHeading);
                        $(articleTargets[i-1]).append(data.success.articleBody);
                    }
                });
            })(i);
        };
    }
}