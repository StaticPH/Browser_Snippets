/*
When run on chrome://bookmarks or any chrome://bookmarks/?q=QUERY_STRING_HERE this gets a JSON object containing the bookmark entries on the page.
Obviously, behavior is not guaranteed when run elsewhere.

Verified on SRWare Iron Portable built on Chromium 72
*/

// To search through ALL bookmarks, try grepping through this 
// window.copy(document.querySelector('bookmarks-app').shadowRoot.querySelector('bookmarks-list').getState().nodes);

function getBookmarkData(bookmarkID){
	// Equivalent to "bookmarks.StoreClient.getState().nodes[bookmarkID];"
	return bookmarks.Store.getInstance().data.nodes[bookmarkID];  // NOT chrome.bookmarks
}
bookmarkEntries = document.querySelector('bookmarks-app').shadowRoot
		.querySelector('bookmarks-list').shadowRoot
		.getElementById('list').items
		.map(k => getBookmarkData(k.id));

// This will only copy the information of bookmarks on the current page, including those not yet/currently scrolled into view.
window.copy(bookmarkEntries);

// Often times I will take the value of bookmarkEntries and pipe it through the following on the command line: 
// 		jq '.[] | {date: .readableTimestamp, title, url}'
