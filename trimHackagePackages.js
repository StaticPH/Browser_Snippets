(function(){
	function removeWithoutPrograms(){
// 		let seek = Array.of(
// 			'library:', 'library and tests:', 'tests:', 'test:', 'benchmark:', 'library and test',
// 			'library, test and benchmark', 'library and benchmark', 'test and benchmark',
// 		);
		let initialCategories = document.querySelectorAll('#content > h3.category');
		console.log('Started with ' + initialCategories.length + ' categories.');
		initialCategories.forEach(function(category){
			let categoryPackageList = category.nextElementSibling; // the immediately subsequent ul.packages element for each h3.category element
			let packages = categoryPackageList.querySelectorAll('li');
			packages.forEach( function(pkg){
				let ignoreBefore = pkg.innerText.indexOf(' ');
// 				if (seek.find( (s)=> e.innerText.substr(ignoreBefore+1).startsWith(s))){
// 				if (! ['program'].find((s)=>e.innerText.substr(ignoreBefore+1).includes(s))){
// 				if (e.innerText.substr(ignoreBefore+1).search('program') <= 0){
				if (! ['program'].find((s) => pkg.innerText.substr(0, pkg.innerText.indexOf(':') - 1).includes(s))){
					// console.log('Removing package: ' + pkg);
					pkg.remove();
				}
			});
			if(! categoryPackageList.childElementCount){
				// If all packages in category were filtered out, remove corresponding h3.category and ul.packages elements
				categoryPackageList.remove();
				console.log('Removing newly emptied category: "' + category.innerText + '"');
				category.remove();
			}
		});
		let finalCategories = document.querySelectorAll('#content > h3.category').length;
		console.log(
			'Removed ' + (initialCategories - finalCategories) + ' categories.', 
			'' + finalCategories + ' categories remaining.'
		);
	}

	function trimToC(){
		let tocEntries = document.querySelectorAll('p.toc > a');
		let initTocEntryCount = tocEntries.length;
		tocEntries.forEach(function(e){
			if (! document.querySelector('h3.category > a[name="cat:' + e.innerText + '"]')){
				e.nextSibling.remove(); e.remove();
			}
			else{
				let category = document.querySelector('h3.category > a[name="cat:' + e.innerText + '"]');
				let packageCount = category.parentElement.nextElementSibling.childElementCount;
				e.nextSibling.textContent = ' (' + packageCount + '), ';
				// console.log('updated ' + e.innerText + ' count to: ' + e.nextSibling.textContent);
			}
		})
		let finalTocEntryCount = document.querySelectorAll('p.toc > a').length;
		console.log(
			"Started with " + initTocEntryCount + " toc entries.",
			"Removed " + (initTocEntryCount - finalTocEntryCount) + " empty categories.",
			"ToC entries remaining: " + finalTocEntryCount
		);
	}

	removeWithoutPrograms();
	trimToC();
	
})();
