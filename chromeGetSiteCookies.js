function getSiteCookies(site){
	//Apparently chrome.cookies is only available to extensions; try document.cookie in the console, which unfortunately may not show cookies from separate domains
	chrome.cookies.getAllCookieStores(function(cookie_stores) {
		for (var i = 0; i < cookie_stores.length; i++) {
	//     	console.log(cookie_stores[i].id);
			chrome.cookies.getAll({domain:site}, function(cookie){
				console.log(cookie)
			})
		}
	});
}


/*
function setSiteCookie(cookieName, value, domain=location.host){ 
	let expiry = new Date(); 
	expiry.setTime(expiry.getTime() + (18500*24*60*60*1000)); //some time several decades from now
	document.cookie = cookieName + "=" + value + "; expires=" + q.toUTCString + "; domain=" + domain + "; path=/";
}

EXAMPLE:
	Running this while on 'https://www.curseforge.com/minecraft/mc-mods/party-parrots' will create a 
	cookie named "abcd" with value of 0 for the domain "www.curseforge.com" with path "/"
		setSiteCookie("abcd", 0); 
	Running this while on 'https://www.curseforge.com/minecraft/mc-mods/party-parrots' (or for that matter, anywhere) will create a 
	cookie named "abcd" with value of 0 for the domain "curseforge.com" with path "/"
		setSiteCookie("wxyz", 0, ".curseforge.com");
*/
