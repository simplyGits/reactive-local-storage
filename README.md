A reactive way to access localStorage.

```
meteor add simply:reactive-local-storage
```

```javascript
Tracker.autorun(function () {
	console.log(ReactiveLocalStorage('key')) // reactivly log localStorage['key'] to the console.
})
ReactiveLocalStorage('key', 'value') // set localStorage['key'] to 'value'
setTimeout(function () {
	ReactiveLocalStorage.removeItem('key') // remove localStorage['key'] after 2 seconds.
}, 2000)
```
