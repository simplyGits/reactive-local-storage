'use strict'

const countDep = new Tracker.Dependency()

const deps = new Map()
function getDep (key) {
	if (!deps.has(key)) {
		deps.set(key, new Tracker.Dependency())
	}
	return deps.get(key)
}

window.addEventListener('storage', function (event) {
	getDep(event.key).changed()
})

RLocalStorage = {
	getItem(key) {
		getDep(key).depend()
		const res = localStorage.getItem(key)
		try {
			return EJSON.parse(res)
		} catch (e) {
			return res
		}
	},
	setItem(key, val) {
		if (!localStorage.getItem(key)) {
			countDep.changed()
		}
		localStorage.setItem(key, EJSON.stringify(val))
		getDep(key).changed()
	},
	removeItem(key) {
		localStorage.removeItem(key)
		getDep(key).changed()
		countDep.changed()
	},
	count() {
		countDep.depend()
		return localStorage.length
	},
}
