/* 
	Obviously, these are intended for use on the internal settings page for the global cookie blocklist
	
	Verified only with SRWare Iron Portable built on Chromium 72
*/
function getSitesOnCookieBlockList(){
	return Array.from(
		document.querySelector('body > settings-ui').shadowRoot
				.querySelector('#main').shadowRoot
				.querySelector('settings-basic-page').shadowRoot
				.querySelector('#advancedPage > settings-section.expanded > settings-privacy-page').shadowRoot
				.querySelector('#pages > settings-subpage.iron-selected > category-setting-exceptions').shadowRoot
				.querySelector('site-list:nth-child(9)').shadowRoot
				.querySelector('#listContainer > iron-list')
				.querySelectorAll('site-list-entry')
	).map(function(ele){
		return ele.shadowRoot.querySelector('div').textContent;
	});
};

function searchListForString(str){
	return getSitesOnCookieBlockList().filter(
		function(cookie){
			return cookie.includes(str);
		}
	);
};
