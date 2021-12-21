import { interval } from "rxjs";
import { map, scan, startWith } from "rxjs/operators";

const firstTwoFibs = [0, 1];
// An endless stream of Fibonnaci numbers.
const fibonnaci$ = interval(1000).pipe(
  // Scan to get the fibonnaci numbers (after 0, 1)
  scan(([a, b]) => [b, a + b], firstTwoFibs),
  // Get the second number in the tuple, it's the one you calculated
  map(([, n]) => n),
  // Start with our first two digits :)
  startWith(...firstTwoFibs)
);

fibonnaci$.subscribe(console.log);
