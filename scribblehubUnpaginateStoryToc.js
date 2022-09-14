//Tested at
// https://www.scribblehub.com/series/74496/throne-of-world/
// https://www.scribblehub.com/series/76176/all-conqueror/
// https://www.scribblehub.com/series/10442/world-keeper/

function getScribbleStoryLastPage(){
	const lastLink = document.querySelector('ul#pagination-mesh-toc > li:nth-last-child(2):not(:nth-child(2)) > a');
	if (lastLink){
		return lastLink.textContent;
	}
	else{
		throw Error('This is the only page.');
	}
}

function reSortOrderedList(ol, descending = false){
	if (!ol instanceof HTMLOListElement){
		throw TypeError("Failed to execute 'reSortOrderedList' on 'ol': Expected HTMLOListElement, but received " + ('' + ol).replace(/\[|\]/, '') + '.');
	}
	const sortHandler = function(a, b){
		return parseInt(a.getAttribute('order') , 10) - parseInt(b.getAttribute('order') , 10);
	}
	let new_ol = ol.cloneNode(false);

	// Add all list-items to an array
	let listItems = [];
	for(var i = ol.childNodes.length; i--;){
		if(ol.childNodes[i].nodeName === 'LI'){
			listItems.push(ol.childNodes[i]);
		}
	}

	// Sort the list-items in descending order
	listItems.sort(sortHandler);

	descending && listItems.reverse();

	// Add them into the ol in order
	for(var i = 0; i < listItems.length; i++){
		new_ol.appendChild(listItems[i]);
	}
	ol.parentNode.replaceChild(new_ol, ol);
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
urlBeforePageNum = document.location.href + '?toc=';
urlAfterPageNum = '#content1';
retrieveSelectors = '.toc_ol > li[title]';
appendToElement = document.querySelector('.toc_ol');

pages = paginationFetcher.genArrayOfIncrementedInt(2, 1, getScribbleStoryLastPage() - 1);
paginationFetcher.fetchPages(pages, retrieveSelectors, appendToElement, urlBeforePageNum, urlAfterPageNum);
reSortOrderedList(document.querySelector('.toc_ol'));

/*
	Copy each chapter's link and title (One pair per-line) with:
		copy(Array.from(document.querySelectorAll('.toc_ol > li.toc_w > a.toc_a'), e => e.href + '\t' + e.textContent.trim()).join('\n'));
	Copy just the chapter links with:
		copy(Array.from(document.querySelectorAll('.toc_ol > li.toc_w > a.toc_a'), e => e.href).join('\n'));
*/
