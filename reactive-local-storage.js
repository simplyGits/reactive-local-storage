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

	return function (key, val, rm) {
		if (deps[key] === undefined) {
			deps[key] = new Tracker.Dependency()
		}
		
		if (rm === true) {
			localStorage.removeItem(key);
			deps[key].changed();
		}

		if (val !== undefined) {
			localStorage.setItem(key, EJSON.stringify(val))
			deps[key].changed()
			return
		}

		deps[key].depend()

		var res = localStorage.getItem(key)
		try {
			return EJSON.parse(res)
		} catch (e) {
			return res
		}
	}
})()
