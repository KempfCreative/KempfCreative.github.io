const RenderHtml = function () {
	const renderHtml = {
		parseObjects: richStoryObj => {
			// Loop through the story objects
			richStoryObj.forEach( ( singleRichStory, storyIndex ) => {
				renderHtml.createNodes( singleRichStory, storyIndex );
			});
			return renderHtml.returnHtml;
		},
		createNodes: ( storyObject, index ) => {
			// Setup the DOM nodes to attach objects to
			function timeConverter(unix_timestamp){
			  var a = new Date(unix_timestamp * 1000);
			  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			  var year = a.getFullYear();
			  var month = months[a.getMonth()];
			  var date = a.getDate();
			  var hour = a.getHours();
			  var min = a.getMinutes();
			  var sec = a.getSeconds();
			  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			  return time;
			}
			const storyDomString = `
				<article class="story-item story-${index}">
					<span class="story-score">${storyObject.score}</span>
					<a href="${storyObject.url}" title="${storyObject.title}" class="story-link">
						<h2 class="story-title">${storyObject.title}</h2>
					</a>
					<time class="story-published-time" datetime="${new Date(storyObject.time*1000)}">${timeConverter(storyObject.time)}</time>
					<div class="author">
						Submitted by:
						<a href="https://news.ycombinator.com/user?id=${storyObject.by.id}">
							<span class="author-id">${storyObject.by.id}</span>
						</a>
						<span class="author-karma">${storyObject.by.karma}</span>
					</div>
				</article>
			`;
			return renderHtml.returnHtml += storyDomString;
		},
		returnHtml: (() => {
			// Parse out the full HTML string
			return '';
		})()
	};
	return renderHtml;
};

const render = new RenderHtml();
export default render;