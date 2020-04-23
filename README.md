# immutable-rxjs
Immutabje.js meets Rxjs

`npm i --save immutable-rxjs`

## ImmutableBehaviorSubject
Acts exactly like BehaviorSubject expect all the output data is always immutable, in other worlds: each copy of the data receiver via `.value`, `.getValue()` or `.subscribe` is a unique data. That includes primitives, objects, arrays and complex structures.

```Typescript
import { ImmutableBehaviorSubject } from 'immutable-rxjs';
