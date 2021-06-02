// Open the web console and paste the following to check every checkbox on the page:
Array.prototype.slice.call(document.querySelectorAll('input[type="checkbox"]')).forEach(function(c){ c.setAttribute('checked', 'true'); });
