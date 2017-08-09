import fetchPromise from './fetchData';


const AuthorInfo = function() {
	const authorInfo = {
		getAuthorInfo: ( stories ) => {
			console.log(stories);
			const authorArray = stories.map( singleStory => {
				return fetchPromise.get( 'https://hacker-news.firebaseio.com/v0/user/', singleStory.by )
			});
			return Promise.all( authorArray );
		},

		authorData: (() => {
			return [];
		})(),

		setAuthorInfo: ( singleStory, authorObj ) => {
			if ( '[object Array]' === Object.prototype.toString.call( authorInfo.authorData ) && 0 <= authorInfo.authorData.length ) {
				singleStory.by = authorObj;
				authorInfo.authorData.push( singleStory );
			} else {
				return authorInfo.authorData.push( {} );
			}
		}
	};
	return authorInfo;
}

const authorInfoData = new AuthorInfo();
export default authorInfoData;