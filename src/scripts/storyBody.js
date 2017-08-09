import fetchPromise from './fetchData';

const StoryBody = function() {
	const storyBody = {
		getStoryBody: top => {
			const storyArray = top.map( id => {
				/* running into a race condition where the author calls happen before the story calls happen
				 * need to have an array of Promises return to storyArray.
				 * storyArray should be passed into a Promise.all, and .then returns the values to the object.
				*/
				return fetchPromise.get( 'https://hacker-news.firebaseio.com/v0/item/', id );
			});
			return Promise.all( storyArray );
		},

		storyData: (() => {
			return [];
		})(),

		setStoryData: data => {
			if ( '[object Array]' === Object.prototype.toString.call(storyBody.storyData) && 0 <= storyBody.storyData.length ) {
				storyBody.storyData.push(data);
			} else {
				return storyBody.storyData.push( {} );
			}
		}
	};
	return storyBody;
};

const storyBodyData = new StoryBody();
export default storyBodyData;
