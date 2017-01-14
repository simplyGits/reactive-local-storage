Package.describe({
	name: 'simply:reactive-local-storage',
	version: '2.1.0',
	summary: 'A reactive way to access localStorage.',
	git: 'https://github.com/simplyGits/reactive-local-storage',
	documentation: 'README.md',
})

Package.onUse(function(api) {
	api.versionsFrom('1.3.2.4')
	api.use([
		'tracker',
		'ejson',
		'ecmascript',
		'modules',
	], 'client')
	api.mainModule('reactive-local-storage.js', 'client')
})
