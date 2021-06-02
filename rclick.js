//see https://stackoverflow.com/questions/7914684/trigger-right-click-using-pure-javascript
// var element = document.getElementById('yourElement');
let element = document.querySelector("#tabs-container > div.resize > div > span:nth-child(23)");
if (window.CustomEvent) {
    element.dispatchEvent(new CustomEvent('contextmenu'));
    console.log('idk but 1');
}
else if (document.createEvent) {
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('contextmenu', true, false);
    element.dispatchEvent(ev);
    console.log('idk but 2');
}
else { // Internet Explorer
    element.fireEvent('oncontextmenu');
    console.log('ie');
}
