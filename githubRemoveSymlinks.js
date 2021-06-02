/* Do not show symlink files while browsing a GitHub repository */
Array.from(
	document.querySelectorAll('div.js-details-container.Details > div > div > div[role="gridcell"] > svg.octicon-file-symlink-file')
).forEach(
	ele => ele.parentElement.parentElement.remove()
);
