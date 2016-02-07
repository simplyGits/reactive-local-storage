Package.describe({
	name: 'simply:reactive-local-storage',
	version: '1.0.0',
	summary: 'A reactive way to access localStorage.',
	git: 'https://github.com/simplyGits/reactive-local-storage',
	documentation: 'README.md',
})

Package.onUse(function(api) {
	api.versionsFrom('1.2.1')
	api.use([
		'tracker',
		'ejson',
		'ecmascript',
	], 'client')
	api.addFiles('reactive-local-storage.js', 'client')
	api.export('RLocalStorage', 'client')
})
