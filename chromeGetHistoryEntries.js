/*
When run on chrome://history or any chrome://history/?q=QUERY_STRING_HERE this gets a JSON object containing the history entries on the page.
Obviously, behavior is not guaranteed when run elsewhere.

There are two critical caveat to this snippet.
#1) Only history entries that the user has scrolled into view will be listed.
	So if you want to see ever entry between now and 3 days less than two months ago, 
	you have to scroll until that all entries on and prior to that second date have been brought into view
	at some point. Only then will this method of accessing the history entries get the results you want.
#2) Unless your specific Chromium-based browser changes this, chrome://history will only allow the user to view their history over the last 90 days.
	There is, by design, no way to configure this behavior in pre-built executables as distributed by Google and most vendors of 3rd-party Chromium-based browsers.
	
	To view history older than 90 days, users can either build their browser executable themselves, patching to change/remove the limit,
	or can rely on 3rd-party software to read from the browser profile's sqlite3 history database file. 

Verified on SRWare Iron Portable built on Chromium 72
*/
histEntries = document.querySelector('#history-app').shadowRoot.querySelector('#history').shadowRoot.getElementById('infinite-list').__data.items;

// Often times I will take the value of histEntries and pipe it through the following on the command line: 
// 		jq '.[] | {date: .readableTimestamp, title, url}'
