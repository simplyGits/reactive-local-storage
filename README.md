A reactive way to access localStorage.

```
meteor add simply:reactive-local-storage
```

```javascript
Tracker.autorun(function () {
	console.log(RLocalStorage.getItem('key')) // reactivly log localStorage['key'] to the console.
})
RLocalStorage.setItem('key', 'value') // set localStorage['key'] to 'value'
setTimeout(function () {
	RLocalStorage.removeItem('key') // remove localStorage['key'] after 2 seconds.
}, 2000)
```
