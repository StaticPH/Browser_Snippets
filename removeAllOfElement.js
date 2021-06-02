function removeAllOfElement(elementType){
	Array.from(document.getElementsByTagName(elementType)).forEach(ele => ele.remove())
}
