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

String.prototype.includesAny = function includesAny(strings){
	let seek = Array.isArray(strings) ? strings : Array.of(strings);

	return seek.find( (s) => this.includes(s));
};

/* Reject links including any of the strings within this array */
rejects=[];

[...new Set(Array.from(document.querySelectorAll('a.topic-tag-link')).map(link=>link.href))]
	.map(x=>x.substring((1+x.lastIndexOf('/'))))
	.filterInPlace(x=>! x.includesAny(rejects));

// Or if you dont want any filtration, just this next line will suffice
// [...new Set(Array.from(document.querySelectorAll('a.topic-tag-link')).map(link=>link.href))].map(x=>x.substring((1+x.lastIndexOf('/'))))
