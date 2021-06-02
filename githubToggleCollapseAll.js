// For github diff views
$$('button.js-details-target').forEach(function(element){ element.click(); });
// Equivalently:   $$('.js-details-target').map(o => o.click())


// https://github.com/sindresorhus/refined-github/issues/226
// For github pull request, viewing changed files
$$('.file-header').forEach(function(element){ element.click(); });


tmpI=-1;
$$('.file-header').forEach($$('.file-info').forEach($$('.btn-octicon').forEach(function(ele){ console.log(tmpI);tmpI++; })));

$$('.file-header').forEach($$('.file-info').forEach($$('.btn-octicon').forEach(function(ele){ ele.click(); })));
