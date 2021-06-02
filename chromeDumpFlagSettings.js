/*
output = document.createElement('textarea');
document.querySelector('div.blurb-container').insertAdjacentElement('afterEnd', output);
document.querySelectorAll('div[jsselect="supportedFeatures"][id]').forEach(function(e){ //the [id] removes unavailable flags
	let setting  = e.querySelector('select.experiment-select');
	let modifier = e.querySelector('div.experiment-switched') ? '*' : '';
	output.value = output.value + modifier + 'index = ' + setting.selectedIndex + '\t#' + e.id + "\tvalue=" + setting.value + '\n';
});

document.querySelectorAll('div.experiment-switched p'); //text for all flags that have been user-set
*/

//remove basically everything on the page except the flag names and their current settings
// document.querySelectorAll('div[jsselect="supportedFeatures"][id] p, h3.experiment-name').forEach(e => e.remove() );
// document.querySelectorAll('div.experiment-switched a').forEach(e => e.text = '*\t' + e.text);
//then just copy/paste the whole page body somewhere and format as desired


(function(){
	let flags = '';
	let key, value;

	// Remove basically everything on the page except the flag names and their current settings
	document.querySelectorAll('div[jsselect="supportedFeatures"][id] p, h3.experiment-name').forEach(ele => ele.remove());
	// Prefix user-specified flags with an asterisk, followed by a tab character
	document.querySelectorAll('div.experiment-switched a').forEach(ele => ele.text = '*\t' + ele.text);

	document.querySelectorAll('div#tab-content-available > div > div.experiment:not([style="display: none;"]) > div').forEach(function(ele){
		key = ele.querySelector('div > a').textContent;
        value = ele.querySelector('div.experiment-actions > div > select.experiment-select').value;
		if (! value){
			value = ele.querySelector('div.experiment-actions > select.experiment-enable-disable').value;
			value = value[0].toUpperCase() + value.slice(1);
		}
		flags += key + '\t' + value + '\n'; 
	});
	copy(flags);
    console.log('Current browser flags configuration has been saved to the clipboard.');
})();
