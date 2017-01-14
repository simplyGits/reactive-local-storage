/* global localStorage */
'use strict'

import { EJSON } from 'meteor/ejson'
import { Tracker } from 'meteor/tracker'

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

export function getItem(key) {
	getDep(key).depend()
	const val = localStorage.getItem(key)
	try {
		return EJSON.parse(val)
	} catch (e) {
		return val
	}
}
export function setItem(key, val) {
	if (!localStorage.getItem(key)) {
		countDep.changed()
	}
	localStorage.setItem(key, EJSON.stringify(val))
	getDep(key).changed()
}
export function removeItem(key) {
	localStorage.removeItem(key)
	getDep(key).changed()
	deps.delete(key)
	countDep.changed()
}
export function count() {
	countDep.depend()
	return localStorage.length
}
export function key(n) {
	countDep.depend()
	return localStorage.key(n)
}
export function clear() {
	for (let i = 0; i < localStorage.length; i++) {
		removeItem(key(i))
	}
}
