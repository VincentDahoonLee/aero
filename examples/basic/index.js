if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js', {
		// The Service-Worker-Allowed must be set to '/'
		scope: '/',
		// Don't cache http requests.
		updateViaCache: 'none'
	}).then(reg => {
		// Update service worker
		reg.update();

		// When the service worker is ready.
		if ('active' in reg) {
			// Share server data with the service worker.
			const chan = new MessageChannel();
			reg.active.postMessage(ctx, [chan.port2]);
			
			// Reload page
			location.reload();
		} else
			console.log(reg.state);
	});
} else {
	// Proxy object fallbacks
}
