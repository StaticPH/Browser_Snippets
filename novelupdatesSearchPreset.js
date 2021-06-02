/* Preset search for Novel Updates series */
console.log('the user needs to first select the "exclude" field for this to work, because idk how to activate it programmatically so that it initially generates the list of tags');

tags2Exclude = [
	'Cannibalism', 'Child Abuse', 'Collection of Short Stories', 'Corruption', 'Depression', 'Disfigurement', 'e-Sports', 'Fujoshi',
	'Male Yandere', 'Manly Gay Couple', 'Misandry', 'Mpreg', 'Netorare', 'Netorase', 'Parasites', 'Psychopaths', 'Serial Killers',
	'Sexual Abuse', 'Stalkers', 'Thriller', 'Trap'
];
excludeChosen = document.querySelector('#tags_exclude_chosen > ul.chosen-choices');
choices = Array.from(document.querySelectorAll('#tags_exclude_chosen > div.chosen-drop > ul.chosen-results > li'));
// setTimeout(excludeChosen.click(), 500);
// setTimeout(excludeChosen.click(), 500);

/* Clear out any existing excluded tags */
document.querySelectorAll('#tags_exclude_chosen > ul.chosen-choices > li.search-choice').forEach(e => e.remove());

tags2Exclude.forEach(function(tag){
	tagInDropdown = choices.find(e => e.innerText == tag);
	tagNumber = tagInDropdown.dataset.optionArrayIndex;
	tagInDropdown.classList.replace('active-result', 'result-selected');
	
	/* Add to excludeChosen */
	newListItem = document.createElement('li');
	newListItem.classList.add('search-choice');

	newSpan = document.createElement('span');
	newSpan.innerText = tag;

	newLink = document.createElement('a');
	newLink.classList.add('search-choice-close');
	newLink.setAttribute('data-option-array-index', tagNumber);

	newListItem.appendChild(newSpan);
	newListItem.appendChild(newLink);

	excludeChosen.prepend(newListItem);
});

genres2Exclude = ['Yaoi'];
allGenres = Array.from(document.querySelectorAll('a.genreme'));
genres2Exclude.forEach(function(genre){
	checkbox = allGenres.find(e => e.innerText == genre);
	checkbox.setAttribute('chkme', 'exclude');
	checkbox.firstElementChild.classList = 'fa fa-minus-square-o';
// 	checkbox.click();
// 	checkbox.click();
});
