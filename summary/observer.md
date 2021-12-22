## Observer

observable이 전달하는 값에 소비자로 간단히 표현하면 observable이 전달하는 next, error, complete 알림을 전달하는 callback모음이라 할 수 있다.

```javascript
const observer = {
  next: x => console.log("Observer got a next value: " + x),
  error: err => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification")
};
```

Observable에 <code>subscribe</code>에 인자로 사용가능

```javascript
observable.subscribe(observer);
```
