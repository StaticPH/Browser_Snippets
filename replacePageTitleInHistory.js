//Replace the title of the current page in your browser history
(function (newTitle){
	document.head.querySelector('title').text = newTitle;
	history.replaceState(history.state, newTitle, location.href)
})(prompt('Enter the new title for the current page:'));