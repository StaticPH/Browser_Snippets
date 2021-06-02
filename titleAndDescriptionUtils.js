function xor(a,b){	return (a && !b) || (!a && b);	};

function isNullOrEmpty(str){ return str == null || str.length == 0; };

function findMetaTagMatchingName(str){
	return Array.prototype.filter.call(
		document.querySelectorAll("meta[name]"), 
		item =>(item.name != null && item.name.includes(str))
	);
};

function findMetaTagMatchingProperty(str){
	return Array.prototype.filter.call(
		document.querySelectorAll("meta[property]"),
		item => { 
			let prop = item.getAttribute('property');
			return prop != null && prop.includes(str);
			/* equivalent to:  (item.getAttribute('property') != null && item.getAttribute('property').includes(str)) */
		}
	);
};

function findMetaTagMatchingNameOrProperty(str){
	return Array.prototype.filter.call(
		document.querySelectorAll(["meta[name]","meta[property]"]),
		function (item){
			let maybePass = !xor(  isNullOrEmpty(item.name), isNullOrEmpty(item.getAttribute('property'))  );
			if (maybePass){return false;}	/* Not sure how I want to handle this scenario, so for now, dont handle it at all */

			return (
				(item.name != null && item.name.includes(str)) ||
				(item.getAttribute('property') != null && item.getAttribute('property').includes(str))
			);
		}
	);
};

function setTabTitle(titleStr){
	document.head.querySelector('title').text = titleStr;
};

function setDescription(description){ 
	document.getElementsByTagName("meta").description = description;
};

function setIndexedTitle_Desc(titleStr, descStr, appendTitleToDesc = false){
	findMetaTagMatchingNameOrProperty('title').map(e=> e.content = titleStr)
	findMetaTagMatchingNameOrProperty('description').map(e=> e.content = (appendTitleToDesc ? descStr + ' - ' + titleStr : descStr))
};
