(function insertColorVars(){
	let existingStyle = document.getElementById('deborkColorVars');
	let debork = existingStyle || document.createElement('style');
	debork.textContent = `
		:root {
			/** Firefox (Gecko; probably also Goanna) **/
			scrollbar-color: auto !important;

			/* ghostwhite, gainsboro, inherit, ivory, none, snow, whitesmoke ???*/
			--barTrackColor: #f1f1f1;
			--scrollerColor: #c0c0c0; /*== silver*/
			--barBorderColor: var(--barTrackColor);
			--idleButtonColor: black;
			--activeButtonColor: dimgray;
			--thumbHoverColor: darkgray;
		}
	`;
	if (!existingStyle){
		debork.type = 'text/css';
		debork.id = 'deborkColorVars';
		document.body.prepend(debork);
	}
})();

(function basicScrollbarDebork(){
	let existingStyle = document.getElementById('deborkScrollbar');
	let debork = existingStyle || document.createElement('style');

	debork.textContent = `
		:root {
			/** Firefox (Gecko; probably also Goanna) **/
			scrollbar-width: auto !important;
		}

		/** The entire scrollbar **/
		::-webkit-scrollbar {
			/* -webkit-appearance: sliderthumb-vertical; */
			/* -webkit-appearance: slider-vertical; */
			min-width: 18px;
		}

		/**
		   The track (progress bar) of the scrollbar,
		   where there is a gray bar on top of a white bar.
		   Seems to consist of both :-webkit-scrollbar-track-piece
		   and ::-webkit-scrollbar-thumb, but NOT ::-webkit-scrollbar-button
		**/
		::-webkit-scrollbar-track {
			border-radius: initial;
			display: initial;

			background-color: var(--barTrackColor);
			background-clip: border-box;
		}
		::webkit-scrollbar-track:vertical {
			border-left: 1px solid var(--barBorderColor);
			border-right: 1px solid var(--barBorderColor);
		}
		::webkit-scrollbar-track:horizontal {
			border-top: 1px solid var(--barBorderColor);
			border-bottom: 1px solid var(--barBorderColor);
		}

		/** The part of the track (progress bar) not covered by the handle. **/
		::-webkit-scrollbar-track-piece {
			border-radius: unset;
			display: initial;
		}

		/** The draggable scrolling handle. **/
		::-webkit-scrollbar-thumb {
			/* background: inherit; */
			background-color: var(--scrollerColor);
			border: 1px solid var(--barBorderColor);
			border-radius: unset;
			display: initial;

			/**
			   Tried using a border-width of 1.5px without this background-clip
			   and the horizontal/vertical selectors below,
			   but it doesn't look as nice.
			**/
			background-clip: padding-box;
		}

		::-webkit-scrollbar-thumb:hover {
			background-color: var(--thumbHoverColor);
		}
		::-webkit-scrollbar-thumb:active {
			background-color: var(--activeButtonColor);
		}

		::-webkit-scrollbar-thumb:vertical {
			border-left: 1px solid transparent;
			border-right: 1px solid transparent;
		}
		::-webkit-scrollbar-thumb:horizontal {
			border-top: 1px solid transparent;
			border-bottom: 1px solid transparent;
		}


		/**
		   The buttons on the scrollbar (arrows pointing upwards
		   and downwards that scroll one line at a time; also exist for left/right).
		**/
		::-webkit-scrollbar-button {
			/* display: initial; */
			/* min-height: 16px; */
			background-color: var(--barTrackColor);
			display: flex;
			width: 16px;
			height: 16px;
			/**
				Tried displaying svg for a downwards arrow... but the result seemed a little less than ideal.
				background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="8px" height="12px" viewBox="0 0 24 12" fill="%235F6368"><g><path d="M 0 0 L 24 0 L 12 12 z"/></g></svg>');

				background-repeat: no-repeat;
				background-position: center;
			**/
		}


		::-webkit-scrollbar-button:vertical {
			/* border-left: 1px solid var(--barBorderColor); */
		}
		::-webkit-scrollbar-button:vertical:decrement {
			/** Interestingly, this somehow seems to influence whether or not the inactive, unhovered style is subsequently applied. **/
		}
		::-webkit-scrollbar-button:vertical:decrement {
			background-image: linear-gradient(transparent 68%, var(--barTrackColor) 68%),
							  linear-gradient(135deg, var(--barTrackColor) 45%, transparent 45%),
							  linear-gradient(45deg, var(--idleButtonColor) 53%, var(--barTrackColor) 53%);
		}
		::-webkit-scrollbar-button:vertical:decrement:hover {
			background-image: linear-gradient(transparent 68%, var(--scrollerColor) 68%),
							  linear-gradient(135deg, var(--scrollerColor) 45%, transparent 45%),
							  linear-gradient(45deg, var(--idleButtonColor) 53%, var(--scrollerColor) 53%);
		}
		::-webkit-scrollbar-button:vertical:decrement:active {
			background-image: linear-gradient(transparent 68%, var(--activeButtonColor) 68%),
							  linear-gradient(135deg, var(--activeButtonColor) 45%, transparent 45%),
							  linear-gradient(45deg, var(--barTrackColor) 53%, var(--activeButtonColor) 53%);
		}
		::-webkit-scrollbar-button:vertical:increment {
			background-image: linear-gradient(45deg, var(--barTrackColor) 45%, transparent 45%),
							  linear-gradient(-225deg, transparent 53%, var(--barTrackColor) 53%),
							  linear-gradient(-180deg, var(--barTrackColor) 31%, var(--idleButtonColor) 31%);
		}
		::-webkit-scrollbar-button:vertical:increment:hover {
			background-image: linear-gradient(45deg, var(--scrollerColor) 45%, transparent 45%),
							  linear-gradient(-225deg, transparent 53%, var(--scrollerColor) 53%),
							  linear-gradient(-180deg, var(--scrollerColor) 31%, var(--idleButtonColor) 31%);
		}
		::-webkit-scrollbar-button:vertical:increment:active {
			background-image: linear-gradient(45deg, var(--activeButtonColor) 45%, transparent 45%),
							  linear-gradient(-225deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(-180deg, var(--activeButtonColor) 31%, var(--barTrackColor) 31%);
		}

		/** Horizontal scrollbar styling NOT YET TESTED; TODO **/
		::-webkit-scrollbar-button:horizontal {
			/* border-top: 1px solid var(--barBorderColor); */
		}
		::-webkit-scrollbar-button:horizontal:decrement {
			background-image: linear-gradient(-135deg, transparent 53%, var(--barTrackColor) 53%),
							  linear-gradient(-45deg, transparent 53%, var(--barTrackColor) 53%),
							  linear-gradient(90deg, var(--idleButtonColor) 70%, var(--barTrackColor) 70%);
		}
		::-webkit-scrollbar-button:horizontal:decrement:hover {
			background-image: linear-gradient(-135deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(-45deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(90deg, var(--idleButtonColor) 70%, var(--activeButtonColor) 70%);
		}
		::-webkit-scrollbar-button:horizontal:decrement:active {
			background-image: linear-gradient(-135deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(-45deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(90deg, var(--barTrackColor) 70%, var(--activeButtonColor) 70%);
		}
		::-webkit-scrollbar-button:horizontal:increment {
			background-image: linear-gradient(135deg, transparent 53%, var(--barTrackColor) 53%),
							  linear-gradient(45deg, transparent 53%, var(--barTrackColor) 53%),
							  linear-gradient(-90deg, var(--idleButtonColor) 70%, var(--barTrackColor) 70%);
		}
		::-webkit-scrollbar-button:horizontal:increment:hover {
			background-image: linear-gradient(135deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(45deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(-90deg, var(--idleButtonColor) 70%, var(--activeButtonColor) 70%);
		}
		::-webkit-scrollbar-button:horizontal:increment:active {
			background-image: linear-gradient(135deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(45deg, transparent 53%, var(--activeButtonColor) 53%),
							  linear-gradient(-90deg, var(--barTrackColor) 70%, var(--activeButtonColor) 70%);
		}

		/**
		   The draggable resizing handle that appears at the bottom
		   corner of some elements.
		**/
		::-webkit-resizer {
			display: initial;
			background: initial;
		}

		/**
		   The bottom corner of the scrollbar, where both horizontal and
		   vertical scrollbars meet. This is often the bottom-right
		   corner of the browser window.
		**/
		::-webkit-scrollbar-corner {
			background-color: initial; /*inherit?*/
		}
	`;
	if (!existingStyle){
		debork.type = 'text/css';
		debork.id = 'deborkScrollbar';
		document.body.prepend(debork);
	}
})();

(function deborkHarder(){
	// Break any webkit properties in inline-style tags that may be affecting the scrollbar.
	document.querySelectorAll('style[type="text/css"]:not(#deborkScrollbar)').forEach(function(s){
		s.textContent = s.textContent.replace(/(::)([^,{]*?scrollbar[^,{ \t\n\r\s]*?)/g, '$1DENIED$2');
	});
})();

(function deborkDocumentAttrs(){
	let topLevel = (document.rootElement || document.scrollingElement || document.querySelector('html'));
	topLevel.attributeStyleMap.delete('overflow');

	// Take care of body-attributes too.
	document.body.attributeStyleMap.delete('overflow');
})();

(function simplebarTooSimple(){
	if (!document.querySelector('.simplebar-scrollbar')){
		// Only insert the CSS for simplebar scrollbars if an element with the
		// simplebar-scrollbar class is actually present on the page already.
		return;
	}

	let existingStyle = document.getElementById('complicateSimplebar');
	let debork = existingStyle || document.createElement('style');
	debork.textContent = `
		.simplebar-scrollbar {
			background-color: var(--scrollerColor);
			background-clip: padding-box;
			border-radius: unset;
			opacity: 1;
			-webkit-transition: unset;
			transition: unset;
		}

		/**
		   The track (progress bar) of the scrollbar,
		   where there is a gray bar on top of a white bar.
		**/
		.scrollable-area .simplebar-track.vertical,
		.scrollable-area .simplebar-track.horizontal {
			border-radius: initial;
			display: initial;

			background-color: var(--barTrackColor);
			background-clip: border-box;
		}
		.scrollable-area .simplebar-track.vertical {
			border-left: 1px solid var(--barBorderColor);
			border-right: 1px solid var(--barBorderColor);
			min-width: 18px;
		}
		.scrollable-area .simplebar-track.horizontal {
			border-top: 1px solid var(--barBorderColor);
			border-bottom: 1px solid var(--barBorderColor);
			min-height: 18px;
		}


		/** The draggable scrolling handle. **/
		.scrollable-area .simplebar-track.vertical .simplebar-scrollbar,
		.scrollable-area .simplebar-track.horizontal .simplebar-scrollbar {
			background-color: var(--scrollerColor);
			border: 1px solid var(--barBorderColor);
			border-radius: unset;
			background-clip: padding-box;
			display: initial;
		}
		.scrollable-area .simplebar-track.vertical .simplebar-scrollbar {
			border-left: 1px solid transparent;
			border-right: 1px solid transparent;
			width: 16px;
		}
		.scrollable-area .simplebar-track.horizontal .simplebar-scrollbar {
			border-top: 1px solid transparent;
			border-bottom: 1px solid transparent;
			height: 16px;
		}

		.tw-root--theme-dark .scrollable-area .simplebar-track .simplebar-scrollbar {
			background: var(--scrollerColor);
		}

		.scrollable-area .simplebar-track.vertical .simplebar-scrollbar:hover,
		.scrollable-area .simplebar-track.horizontal .simplebar-scrollbar:hover {
			background-color: var(--thumbHoverColor);
		}
		.scrollable-area .simplebar-track.vertical .simplebar-scrollbar:active,
		.scrollable-area .simplebar-track.horizontal .simplebar-scrollbar:active {
			background-color: var(--activeButtonColor);
		}
		.simplebar-scrollbar.visible,
		.simplebar-scrollbar:hover,
		.simplebar-track:hover .simplebar-scrollbar {
			opacity: 1 !important;
		}
	`; //FIXME: That last selector simply refuses to work, even if it were immediately overridden, despite having been directly copy/pasted from the original CSS stylesheet...
	if (!existingStyle){
		debork.type = 'text/css';
		debork.id = 'complicateSimplebar';
		// It is important to specifically use document.body.append for this,
		// as the style being overridden may itself have been appended,
		// rather than placed in document.head or prepended
		document.body.append(debork);
	}
})();

void(0);
