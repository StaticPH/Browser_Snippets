print
alert
	navigator
eval
location
scroll
status
	number
	object
	code
	gadget
		gadgets.util.getUrlParameters
self
	undefine
	unescape
focus
location
	clientInformation
	confirm
find
origin
	shindig.random()
gapi
	prompt
symbol

btoa
atob



window.find() 	// Allows you to search the current page for text, as you would with the find dialog (Ctrl+f),
				// but with additional options, including CASE-SENSITIVITY.
window.fetch()

window.findAncestor(node, predicate)

window.findAncestorByClass(el, className)

==========================================
'(on chrome://bookmarks)'
==========================================

window.bookmarks
window.blur()
window.hasKeyModifiers(e)
window.getUrlForCss(s)
window.getSelection()
window.getSVGElement(id)
window.getRequiredElement(id)
window.queryRequiredElement(selectors, opt_context)
window.external
window.open() // native code; uncertain why this is listed as 'open: f open()' but openDatabase is listed as 'openDatabase: f ()'
window.openDatabase() //native code
window.customElements
window.createElementWithClassName(type, className)
window.disableTextSelectAndDrag(opt_allowSelectStart, opt_allowDragStart)
window.isSecureContext=true
window.listenOnce(target, eventNames, callback) // not globally available
window.postMessage() // native code; globally available
window.quoteString(str) // not globally available
window.cr.ui.*
window.cr.sendWithPromise()
window.cr.isWindows
window.cr.isMac
window.cr.isLinux
window.cr.icon.getImage(path)
window.cr.icon.getFavicon(url)
window.cr.getUid(item)
window.cr.exportPath(name, opt_object, opt_objectToExportTo)
window.cr.define(name, fun)
window.cr.ui.Command(opt_propertyBag)
window.cr.ui.KeyboardShortcutList(shortcuts)
window.cr.ui.define(tagNameOrFunction)
window.cr.ui.swallowDoubleClick(e)
window.cr.ui.CanExecuteEvent(command)
window.cr.makePublic(ctor, methods, opt_target)

window.clientInformation.clipboard
window.clientInformation.cookieEnabled
window.clientInformation.credentials
window.clientInformation.keyboard
window.clientInformation.permissions
window.clientInformation.plugins
window.clientInformation.storage
window.clientInformation.usb
window.chrome.*

window.captureEvents()
window.releaseEvents()
window.caches
window.appendParam(url, key, value)
window.JSCompiler_renameProperty(prop, obj)
window.swapDomNodes(a, b)

chrome.metricsPrivate.*
chrome.tabs.*
chrome.windows.*

//NOTE: window.bookmarks != chrome.bookmarks
// the former can operate upon bookmarks

// window.bookmarks.StoreClient.getState()

chrome.bookmarks.export
chrome.bookmarks.getChildren('1797', console.log)

==========================================
GENERALLY USEFUL TRICKS:
==========================================

//Copies the zero-width-space character (ZWSP) to the clipboard
copy('\u200b');

window.find() 	// Allows you to search the current page for text, as you would with the find dialog (Ctrl+f),
				// but with additional options, including CASE-SENSITIVITY.
