ReactiveLocalStorage = (function () {
	'use strict'

	var deps = {}
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i)
		deps[key] = new Tracker.Dependency()
	}

	window.addEventListener('storage', function (event) {
		if (deps[event.key] === undefined) {
			deps[event.key] = new Tracker.Dependency()
		}
		deps[event.key].changed()
	})

	return function (key, val) {
		if (deps[key] === undefined) {
			deps[key] = new Tracker.Dependency()
		}

		if (val !== undefined) {
			localStorage.setItem(key, JSON.stringify(val))
			deps[key].changed()
		}

		deps[key].depend()

		var res = localStorage.getItem(key)
		try {
			return JSON.parse(res)
		} catch (e) {
			return res
		}
	}
})()
