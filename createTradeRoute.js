window.createTradeRoute = async (villageId, r1, r2, r3, r4, hour = 0, repeat = 1) => {
	return fetch('build.php', {
		method: 'POST',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `show-destination=on&did_dest=${villageId}&r1=${r1}&r2=${r2}&r3=${r3}&r4=${r4}&userHour=${hour}&repeat=${repeat}&gid=17&a=0&t=0&trid=0&option=256`,
		credentials: 'include'
	});
}

window.findVillage = (villageName) => {
	const dest = document.querySelector('#did_dest');
	if (!dest) {
		return;
	}
	const destOptions = [].slice.call(dest.querySelectorAll('option'));

	return destOptions.find(o => {
		return o.text.startsWith(villageName)
	});
}

window.createMultipleTradeRoutes = (villageName, lumber, clay, iron, crop, repeat = 1, firstHour = 0, step = 1) => {
	const village = window.findVillage(villageName);
	if (!village) {
		alert('Couldn\'t find village, redirecting to "Marketplace"');
		window.location('build.php?t=0&gid=17&option=1&show-destination=all');
	}

	for (var hour = firstHour; hour < 24; hour = hour + step) {
		console.log(`window.createTradeRoute(${village}, ${lumber}, ${clay}, ${iron}, ${crop}, ${hour}, ${repeat})`);
		window.createTradeRoute(village.value, lumber, clay, iron, crop, hour, repeat);
	}
}

window.removeTradeRoutes = () => {
	const tradeTable = document.querySelector('#trading_routes');
	console.log(tradeTable);
	const removeLinks = [].slice.call(tradeTable.querySelectorAll('td.sel a'));
	console.log(removeLinks);
	removeLinks.forEach(l => {
		fetch(l.attributes['href'].value, {
			headers: {
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
				"Upgrade-Insecure-Requests": "1"
			},
			credentials: 'include'
		});
	});
}