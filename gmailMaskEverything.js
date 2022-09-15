Element.prototype.updateAttributeIfExists = function updateAttributeIfExists(name, value){
//TODO: allow passing a function that accepts a string (the current attribute value) as the value parameter
	if (this.hasAttribute(name)){
		this.setAttribute(name, value);
	}
}

Element.prototype.maskAttributeIfExists = function maskAttributeIfExists(name, maskChar = '*'){
	//silently allows maskChar to be longer than just 1 character, which may not be desirable
	if (this.hasAttribute(name)){
		this.setAttribute(name, maskChar.repeat(this.getAttribute(name).length));
	}
}

function maskTextNodes(node, maskChar){
	function __applyTextNodeMask(childNode){
		if (childNode.nodeType === Node.TEXT_NODE){
			childNode.textContent = childNode.textContent.replaceAll(/\w/, maskChar);
		}
	}
	node.childNodes.forEach(__applyTextNodeMask);
}
function maskAllTextNodes(node, maskChar){
	node.childNodes.forEach(function(childNode){
		if (childNode.hasChildNodes()){
			maskAllTextNodes(childNode, maskChar);
		}
		maskTextNodes(childNode,maskChar);
	});
}


document.querySelectorAll('.bqe').forEach(e=>e.textContent = '*'.repeat(e.textContent.length));
document.querySelectorAll('.Zt').forEach(e=>e.nextSibling.textContent = e.nextSibling.textContent.replaceAll(/\w/,'X'));
document.querySelectorAll('.bA4 > .yP, .bA4 > .zF').forEach(function(e){
	e.textContent = e.textContent.replaceAll(/\w/,'X');
	if (e.hasAttribute('email')){
		e.setAttribute('email', '*'.repeat(e.getAttribute('email').length));
	};
	if (e.hasAttribute('name')){
		e.setAttribute('name', '*'.repeat(e.getAttribute('name').length));
	};
	if (e.hasAttribute('data-hovercard-id')){
		e.setAttribute('data-hovercard-id', '*'.repeat(e.getAttribute('data-hovercard-id').length));
	};
});
document.querySelectorAll('.yX.xY,.xY.a4W').forEach(ele => maskAllTextNodes(ele, 'X'));
document.querySelectorAll('.xY.a4W').forEach(function(e){
	e.querySelectorAll('.at[title]').forEach(function(ee){
		ee.setAttribute('title', ee.getAttribute('title').replaceAll(/\w/, 'X'));
		ee.querySelectorAll('.av').forEach(eee => eee.textContent = eee.textContent.replaceAll(/\w/,'X'));
	});
});
document.title = document.title.replaceAll(/\w/,'X');

whoamiLink = dq('[aria-label^="Google Account: "]');
whoamiLink.setAttribute('aria-label', 'Google Account: ' + whoamiLink.getAttribute('aria-label').slice(16).replaceAll(/\w/, 'X'));

document.querySelectorAll('.gb_de > :not(:first-child), .znj3je, .Wdz6e').forEach(e => e.textContent = e.textContent.replaceAll(/\w/,'X'));

document.querySelectorAll('.aim').forEach(function(e){
	e.querySelectorAll('[data-tooltip]').forEach(ee => ee.setAttribute('data-tooltip', 'Placeholder Text'));
	let lnk = e.querySelector('a');
	lnk.href = lnk.href.replace(/#label\/.+/, '#label/PLACEHOLDER');
	lnk.setAttribute('aria-label', lnk.getAttribute('aria-label').replace(lnk.textContent, 'PLACEHOLDER'));
	lnk.textContent = 'PLACEHOLDER';
	e.querySelectorAll('[data-label-name]').forEach(ee => ee.setAttribute('data-label-name', 'Placeholder Text'));
});