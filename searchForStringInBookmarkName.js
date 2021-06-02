/* Works, but doesn't seem to find most bookmarks not currently fitting on the screen */

// Use this to search for a string in the name of a bookmark. In this case, searching for any of 'pen', 'draw', 'tablet', 'touch', or 'ink'
found = Array.from(document.querySelector('body > bookmarks-app').shadowRoot.querySelector('#main-container > bookmarks-list').shadowRoot.querySelectorAll('#list > bookmarks-item')).filterInPlace(
	bk => bk.getAttribute('aria-label').includesAny('pen', 'draw', 'tablet', 'touch', 'ink')
)
.map (
	bk => bk.shadowRoot.querySelector('#website-title').innerText.trim() + '     ' + bk.shadowRoot.querySelector('#website-url').innerText.trim()
);

String.prototype.includesAny = function includesAny(strings){
	let seek = Array.isArray(strings) ? strings : Array.of(strings);

	return seek.find( (s) => this.includes(s)/* && console.log('\033[36m"' + this + '".includes "' + s + '"') */ );
};

/*
	Behaves much like the normal Array.filter() method,
	but performs the filtering in-place before returning the original array modified,
	rather than returning a newly created array with the filtered values 
*/
Array.prototype.filterInPlace = function filterInPlace(condition) {
	let matches = 0;
	this.forEach((ele, i) => { 
		if (condition.call(this, ele, i, this)) {
			if (i !== matches) {
				this[matches] = ele; 
			}
			matches++;
		}
	});

	this.length = matches;
	return this;
};
