A reactive way to access localStorage.

```
meteor add simply:reactive-local-storage
```

```javascript
Tracker.autorun(function () {
	console.log(ReactiveLocalStorage('key'))
})
ReactiveLocalStorage('key', 'value')
```
