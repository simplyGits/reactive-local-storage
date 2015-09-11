Package.describe({
	name: 'simply:reactive-local-storage',
	version: '0.0.4',
	summary: 'A reactive way to access localStorage.',
	git: 'https://github.com/simplyGits/reactive-local-storage',
	documentation: 'README.md',
})

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.3')
	api.use('tracker', 'client')
	api.addFiles('reactive-local-storage.js', 'client')
	api.export('ReactiveLocalStorage', 'client')
})
