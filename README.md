## RxJS 정리

---

RxJS는 관찰가능한 시퀀스를 사용해 비동기 및 이벤트 기반 프로그램을 구성하기 위한 라이브러리.  
핵심 타입인 **Observable**과 보조 타입으로 (Observer, Scheduler, Subjects)를 제공하며 **Array#extras**(map, reduce, every, etc)등의 연산자를 통해 비동기 이벤트 컬렉션을 배열처럼 처리 할 수 있음.

**Reactive X**는 **Observer** 패턴을 **Iterator**패턴과 결합하고 함수형 프로그래밍을 컬렉션과 결합하여 이벤트 시퀀스를 관리하는 이상적인 방법에 대한 요구 사항을 충족합니다.

---

## 비동기 이벤트를 관리를 위한 RxJS의 주요 개념

- [**Observable**](./summary/observables.md) : 값 또는 이벤트 호출이 가능한 컬렉션 기능을 제공.
- **Observer** : Observable이 전달하는 값을 수신하는 방법을 알고 있는 콜백 모음.
- **Subscription** : Observable의 실행을 나타내며 주로 실행 취소하는 데 유용합니다.
- **Operators** : map, filter, concat, reduce 등과 같은 작업으로 컬렉션을 처리하는 함수형 프로그래밍 스타일을 가능하게 하는 순수 함수.
- **Subject** : EventEmitter와 동일하며 값이나 이벤트를 여러 관찰자에게 멀티캐스팅하는 유일한 방법.
- **Schedulers** : 동시성을 제어하는 ​​중앙 집중식 디스패처로, setTimeout, requestAnimationFrame 등에서 계산이 발생할 때 조정할 수 있습니다.

---

### Purity

순수함수를 통해 값을 만들 수 있고 이는 코드 오류를 줄일 수 있다.

일반 js를 이용한 방법

```javascript
let count = 0;
document.addEventListener("click", () =>
  console.log(`Clicked ${++count} times`)
);
```

RxJS를 이용한 방법

```javascript
import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(scan(count => count + 1, 0))
  .subscribe(count => console.log(`Clicked ${count} times`));
```

### Flow

이벤트가 Observables 통해 흐르는 방식을 제어하는 ​​데 도움이 되는 연산자를 제공.

일반 js를 이용한 방법

```javascript
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```

RxJS를 이용한 방법

```javascript
import { fromEvent } from "rxjs";
import { throttleTime, scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
  )
  .subscribe(count => console.log(`Clicked ${count} times`));
```

### Values

## Observables을 통해 전달된 값을 변환할 수 있습니다.

```javascript
let count = 0;
const rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener("click", event => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});
```

RxJS를 이용한 방법

```javascript
import { fromEvent } from "rxjs";
import { throttleTime, map, scan } from "rxjs/operators";

fromEvent(document, "click")
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count));
```
