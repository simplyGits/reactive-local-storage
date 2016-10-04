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
	const res = localStorage.getItem(key)
	try {
		return EJSON.parse(res)
	} catch (e) {
		return res
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
