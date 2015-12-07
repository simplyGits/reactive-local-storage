ReactiveLocalStorage = (function () {
	'use strict'
	var deps = {}

	function getDep (key) {
		if (deps[key] === undefined) {
			deps[key] = new Tracker.Dependency()
		}
		return deps[key]
	}

	window.addEventListener('storage', function (event) {
		getDep(event.key).changed()
	})

	var ReactiveLocalStorage = function (key, val) {
		var dep = getDep(key)

		if (val !== undefined) {
			localStorage.setItem(key, EJSON.stringify(val))
			dep.changed()
		}

		dep.depend()

		var res = localStorage.getItem(key)
		try {
			return EJSON.parse(res)
		} catch (e) {
			return res
		}
	}

	ReactiveLocalStorage.removeItem = function (key) {
		localStorage.removeItem(key)

		var dep = getDep(key)
		if (dep.hasDependents()) {
			dep.changed()
		} else {
			delete deps[key]
		}
	}

	return ReactiveLocalStorage
})()
