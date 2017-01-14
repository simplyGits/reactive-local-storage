A reactive way to access `localStorage`.

The API is the same as [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage), expect that `length` isn't included, use `count()` instead.

```
meteor add simply:reactive-local-storage
```

```javascript
import * as RLocalStorage from 'meteor/simply:reactive-local-storage'

Tracker.autorun(function () {
	console.log(RLocalStorage.getItem('key')) // reactivly log localStorage['key'] to the console.
})
RLocalStorage.setItem('key', 'value') // set localStorage['key'] to 'value'
setTimeout(function () {
	RLocalStorage.removeItem('key') // remove localStorage['key'] after 2 seconds.
}, 2000)
```
