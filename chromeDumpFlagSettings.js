(function(){
	let chromiumVersion = 'Chromium Version: ' + document.getElementById('version').textContent;
	let flags = [];
	document.querySelectorAll('div#tab-content-available > div > div[jsselect="supportedFeatures"][id]:not([style="display: none;"]) > flags-experiment').forEach(function(experiment){
		let root = experiment.shadowRoot;
		let flag = root.querySelector('div > a');
		let textArea = root.querySelector('textarea-container');

		//shadowRoot.querySelector('div.flex.experiment-actions > select').getAttribute('data-internal-name') should return the same as shadowRoot.querySelector('div.flex > a.permalink').textContent, aside from the latter's leading '#'
		let value = root.querySelector('select.experiment-enable-disable,select.experiment-select').value;
		value = value[0].toUpperCase() + value.slice(1);

		// let switchedFlagLabel = root.querySelector('div.experiment-switched a');
		// `{switchedFlagLabel ? '*\t' + switchedFlagLabel.textContent : root.querySelector('div > a').textContent}`

		// root.querySelectorAll('.experiment-name, p').forEach(e => e.remove()));

		flags.push(
			(flag.parentElement.parentElement.classList.contains('experiment-switched') ? '*\t': '') +
			flag.textContent + '\t' +
			value +
			(textArea && textArea.textContent.length !== 0 ? '\t\t' + textArea.textContent : '')
		);
	});

	copy(chromiumVersion + '\n' + flags.join('\n'));
	console.log('Current browser flags configuration has been saved to the clipboard.');
})();
