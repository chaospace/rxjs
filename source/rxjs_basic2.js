import { from, Observable } from "rxjs";

function funFoo() {
  console.log("Hello");
  return 42;
}

const funx = funFoo.call();
console.log(funx);

const funy = funFoo.call();
console.log(funy);

// rxjs로 표현하면 이렇게
const foo = new Observable(subscriber => {
  console.log("Hello");
  subscriber.next(42);
});

foo.subscribe(x => {
  console.log(x);
});

foo.subscribe(y => {
  console.log(y);
});

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
observable.subscribe({
  next(x) {
    console.log("x", x);
  },
  complete() {
    console.log("subscription-complete");
  }
});

// later 구독취소
subscription.unsubscribe();
