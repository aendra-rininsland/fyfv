chrome.extension.sendMessage({}, function (response) {
		var readyStateCheckInterval = setInterval(function () {
		document.querySelectorAll('.anvato').forEach(node => {
			node.remove()
			console.log('Removed a goddamn Anvato player');
		});
		if (document.readyState === "complete") {
			// Now add a mutation observer to remove any that are sneakily added
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.addedNodes.length) {
						for (var i = 0; i < mutation.addedNodes.length; i++) {
							if (mutation.addedNodes[i].classList && mutation.addedNodes[i].classList.contains('anvato')) {
								console.log('Removed sneaky-ass Anvato player');
								mutation.addedNodes[i].remove();
							}
						}
					}
				});
			});
			observer.observe(document.body, { childList: true, subtree: true });
			clearInterval(readyStateCheckInterval);
		}
	}, 10);
});