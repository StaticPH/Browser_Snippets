//Replace the title of the current page in your browser history
(function (newTitle){
	if (newTitle != null && newTitle.length > 0){
		document.head.querySelector('title').text = newTitle;
		history.replaceState(history.state, newTitle, location.href);
	}
	else {
		console.warn('History not modified: New title must be a string with length >= 1.');
	}
})(prompt('Enter the new title for the current page:'));