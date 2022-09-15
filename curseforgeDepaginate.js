function getLastPage(){
	const lastLink = document.querySelector('.my-4 > .pagination > a:last-of-type > span');
	if (lastLink){
		return Number(lastLink.textContent);
	}
	else{
		throw Error('This is the only page.');
	}
}
function getCurrentPage(){
	return Number(document.querySelector('.pagination > span.pagination-item--active').textContent) || 1;
}

var paginationFetcher = {
	name: 'paginationFetcher',
	responseHtml: null,
	failedResponseCapture: [],
	lastFailure: function getLastFailure(count){
		if (count > this.failedResponseCapture){
			count = this.failedResponseCapture;
		}
		return this.failedResponseCapture.slice(this.failedResponseCapture.length - (count || 1), this.failedResponseCapture.length);
	},
	successfulFetchText: function successfulFetchText(response){
		return response.text();
	},
	failedFetch: function failedFetch(response){
		console.error(`Failed to fetch content. See ${this.name}.lastFailure() for details`);
		this.failedResponseCapture.push(response);
	},
	announceErr: async function ohShit(response){
		console.error(`Something went terribly wrong! See ${this.name}.lastFailure() for details`);
		await this.failedResponseCapture.push(response);
	},
	genArrayOfIncrementedInt: function genArrayOfIncrementedInt(startValue, increment, count){
		if (!count){ return []; }
		let arr = Array(Number(count));
		let nextValue = startValue;
		for (let i = 0; i < arr.length ; i++){
			arr[i] = nextValue;
			nextValue = nextValue + increment;
		}
		return arr;
	},
	fillArrayWithIncrementedInt: function fillArrayWithIncrementedInt(startValue, increment, arr){
		if (!Array.isArray(arr)){ throw TypeError('arr must be of type Array'); }
		else if (arr.length === 0){ throw RangeError('Array size is zero.'); }
		let nextValue = startValue;
		for (let i = 0; i < arr.length ; i++){
			arr[i] = nextValue;
			nextValue = nextValue + increment;
		}
		return arr;
	},
	fetchPages: async function fetchPages(pages, retrieveSelectors, appendTo, urlBeforePageNum, urlAfterPageNum){
		// pages: an array of integers
		// retrieveSelectors: a CSS selector string to extract all matches of from the responses
		// appendTo: the Element to which retrieved elements will be appended
		// urlBeforePageNum: a string containing the part of the url prior to the page number
		// urlAfterPageNum: a nullable string containing any part of the url that comes after the page number
		const successfulFetchText =  this.successfulFetchText;
		const failedFetch = this.failedFetch;
		const announceErr = this.announceErr;
		if (!Array.isArray(pages)){
			console.log('fetchPages method did not receive an Array for pages; assuming pages is a single page number.');
			// Note: Page number is never checked for existence
			pages = Array.of(pages);
		}
		pages.forEach(function(page){
			const pageURL = urlBeforePageNum + page + urlAfterPageNum;
			console.log('fetching page ' + page + ' from ' + pageURL);
			fetch(
				pageURL, {
				"credentials": "include",
				"headers":{
					"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
					"accept-language": "en-US,en;q=0.9",
					"upgrade-insecure-requests": "1"
				},
				"referrerPolicy": "strict-origin-when-cross-origin",
				"body": null,
				"method": "GET",
				"mode": "cors"
			})
			.then(successfulFetchText, failedFetch)
			.then(function(rawHtml){
				console.log('Fetched page ' + page + ' successfully.');
				let parser = new DOMParser(); //TODO: consider a reusable parser instance.
				responseHtml = parser.parseFromString(rawHtml, 'text/html');
				appendTo.append(
					...responseHtml.querySelectorAll(retrieveSelectors)
				);
			})
			.catch(announceErr);
		});
	}
};
urlBeforePageNum = /[?&]page=/.test(document.location.href) ?
					document.location.href.replace(/([?&]page=)[1-9][0-9]*/, '$1') :
					(document.location.href.endsWith('?') ? document.location.href + 'page=' :
						document.location.href + (document.location.href.include('?') ? '&page=' : '?page=')
					);
urlAfterPageNum = document.location.search.split(/[?&]page=[1-9][0-9]*/, 2)[1] || '';
if (urlAfterPageNum.length > 0){ urlAfterPageNum = '&' + urlAfterPageNum; }

retrieveSelectors = 'section > .px-2 > div > div:nth-of-type(3) > div > .my-2';
appendToElement = document.querySelector('section > .px-2 > div > div:nth-of-type(3) > div');

// pages = paginationFetcher.genArrayOfIncrementedInt(2, 1, getLastPage() - 1);
pages = paginationFetcher.genArrayOfIncrementedInt(getCurrentPage() + 1, 1, 5 + getCurrentPage());
paginationFetcher.fetchPages(pages, retrieveSelectors, appendToElement, urlBeforePageNum, urlAfterPageNum);
