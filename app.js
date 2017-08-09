/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FetchData = function FetchData() {
  var fetchData = {
    get: function get(url, optionalId) {
      return new Promise(function (resolve, reject) {
        var urlPath = undefined !== optionalId && optionalId.length > 0 ? '' + url + optionalId + '.json' : url;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function (event) {
          console.log(this);
          resolve(this.response);
        });
        xhr.open('GET', urlPath);
        xhr.responseType = 'json';
        xhr.send();
      });
    }
  };
  return fetchData;
};

var fetchPromise = new FetchData();
exports.default = fetchPromise;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _topStories = __webpack_require__(6);

var _topStories2 = _interopRequireDefault(_topStories);

var _storyBody = __webpack_require__(5);

var _storyBody2 = _interopRequireDefault(_storyBody);

var _authorInfo = __webpack_require__(3);

var _authorInfo2 = _interopRequireDefault(_authorInfo);

var _renderHtml = __webpack_require__(4);

var _renderHtml2 = _interopRequireDefault(_renderHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_topStories2.default.storyArray().then(function (topStoryIds) {
    // console.log( topStoryIds );
    var storyBodiesPromise = _storyBody2.default.getStoryBody(topStoryIds);
    // console.log( storyBodiesPromise );
    storyBodiesPromise.then(function (topStoryBodies) {
        // console.log( topStoryBodies );
        topStoryBodies.forEach(function (response) {
            // console.log(response);
            return _storyBody2.default.setStoryData(response);
        });
        return _storyBody2.default.storyData;
    }).then(function (storyObjectArray) {
        var authorBodiesPromise = _authorInfo2.default.getAuthorInfo(storyObjectArray);
        // console.log(authorBodiesPromise);
        authorBodiesPromise.then(function (topStoryBodiesWithAuthor) {
            topStoryBodiesWithAuthor.forEach(function (response, index) {
                return _authorInfo2.default.setAuthorInfo(storyObjectArray[index], response);
            });
            return _authorInfo2.default.authorData;
        }).then(function (fullStoryObject) {
            return fullStoryObject.sort(function (a, b) {
                return b.score - a.score;
            });
        }).then(function (sortedStories) {
            // console.log( sortedStories );
            var storiesString = _renderHtml2.default.parseObjects(sortedStories);
            document.getElementById('news-main').innerHTML = storiesString;
        });
    });
});

console.log('JavaScript is amazing!');

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fetchData = __webpack_require__(0);

var _fetchData2 = _interopRequireDefault(_fetchData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorInfo = function AuthorInfo() {
	var authorInfo = {
		getAuthorInfo: function getAuthorInfo(stories) {
			console.log(stories);
			var authorArray = stories.map(function (singleStory) {
				return _fetchData2.default.get('https://hacker-news.firebaseio.com/v0/user/', singleStory.by);
			});
			return Promise.all(authorArray);
		},

		authorData: function () {
			return [];
		}(),

		setAuthorInfo: function setAuthorInfo(singleStory, authorObj) {
			if ('[object Array]' === Object.prototype.toString.call(authorInfo.authorData) && 0 <= authorInfo.authorData.length) {
				singleStory.by = authorObj;
				authorInfo.authorData.push(singleStory);
			} else {
				return authorInfo.authorData.push({});
			}
		}
	};
	return authorInfo;
};

var authorInfoData = new AuthorInfo();
exports.default = authorInfoData;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var RenderHtml = function RenderHtml() {
	var renderHtml = {
		parseObjects: function parseObjects(richStoryObj) {
			// Loop through the story objects
			richStoryObj.forEach(function (singleRichStory, storyIndex) {
				renderHtml.createNodes(singleRichStory, storyIndex);
			});
			return renderHtml.returnHtml;
		},
		createNodes: function createNodes(storyObject, index) {
			// Setup the DOM nodes to attach objects to
			function timeConverter(unix_timestamp) {
				var a = new Date(unix_timestamp * 1000);
				var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				var year = a.getFullYear();
				var month = months[a.getMonth()];
				var date = a.getDate();
				var hour = a.getHours();
				var min = a.getMinutes();
				var sec = a.getSeconds();
				var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
				return time;
			}
			var storyDomString = '\n\t\t\t\t<article class="story-item story-' + index + '">\n\t\t\t\t\t<span class="story-score">' + storyObject.score + '</span>\n\t\t\t\t\t<a href="' + storyObject.url + '" title="' + storyObject.title + '" class="story-link">\n\t\t\t\t\t\t<h2 class="story-title">' + storyObject.title + '</h2>\n\t\t\t\t\t</a>\n\t\t\t\t\t<time class="story-published-time" datetime="' + new Date(storyObject.time * 1000) + '">' + timeConverter(storyObject.time) + '</time>\n\t\t\t\t\t<div class="author">\n\t\t\t\t\t\tSubmitted by:\n\t\t\t\t\t\t<a href="https://news.ycombinator.com/user?id=' + storyObject.by.id + '">\n\t\t\t\t\t\t\t<span class="author-id">' + storyObject.by.id + '</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<span class="author-karma">' + storyObject.by.karma + '</span>\n\t\t\t\t\t</div>\n\t\t\t\t</article>\n\t\t\t';
			return renderHtml.returnHtml += storyDomString;
		},
		returnHtml: function () {
			// Parse out the full HTML string
			return '';
		}()
	};
	return renderHtml;
};

var render = new RenderHtml();
exports.default = render;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fetchData = __webpack_require__(0);

var _fetchData2 = _interopRequireDefault(_fetchData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StoryBody = function StoryBody() {
	var storyBody = {
		getStoryBody: function getStoryBody(top) {
			var storyArray = top.map(function (id) {
				/* running into a race condition where the author calls happen before the story calls happen
     * need to have an array of Promises return to storyArray.
     * storyArray should be passed into a Promise.all, and .then returns the values to the object.
    */
				return _fetchData2.default.get('https://hacker-news.firebaseio.com/v0/item/', id);
			});
			return Promise.all(storyArray);
		},

		storyData: function () {
			return [];
		}(),

		setStoryData: function setStoryData(data) {
			if ('[object Array]' === Object.prototype.toString.call(storyBody.storyData) && 0 <= storyBody.storyData.length) {
				storyBody.storyData.push(data);
			} else {
				return storyBody.storyData.push({});
			}
		}
	};
	return storyBody;
};

var storyBodyData = new StoryBody();
exports.default = storyBodyData;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchData = __webpack_require__(0);

var _fetchData2 = _interopRequireDefault(_fetchData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopStories = function TopStories() {
  var topStories = {
    storyArray: function storyArray() {
      return _fetchData2.default.get('https://hacker-news.firebaseio.com/v0/topstories.json').then(function (response) {
        var topStoriesArray = response;
        var topTen = void 0,
            topTenObj = {};
        // Pick out 10 random numbers 0 - response.length-1
        while (Object.keys(topTenObj).length < 10) {
          var rand = Math.floor(Math.random() * topStoriesArray.length);
          topTenObj[topStoriesArray[rand]] = topStoriesArray[rand];
        }
        // Assign to a new array
        topTen = Array.from(Object.keys(topTenObj));
        // Return the new array
        return topTen;
      }).catch(function (error) {
        return console.error(error);
      });
    }
  };
  return topStories;
};

var topStoriesSorted = new TopStories();
exports.default = topStoriesSorted;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);