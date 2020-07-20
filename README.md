# partition

> 🗂 Partition an array or other iterable into two or more parts

`partition()` is like `[].filter()` except you get the `true` and `false`
results as separate arrays.

`partitionMap()` is like `partition()`, but instead of `true`/`false`, results
are grouped by the return value of the passed function.

## Install

Using [Yarn]:

```bash
$ yarn add @blakek/partition
```

…or using [npm]:

```bash
$ npm i --save @blakek/partition
```

## Usage

```js
import { partition, partitionMap } from '@blakek/partition';

const isEven = n => n % 2 === 0;

const [even, odd] = partition([1, 2, 3, 4, 5], isEven);

console.log(even); //» [2, 4]
console.log(odd); //» [1, 3, 5]

const scores = [
  { initials: 'ABC', score: 125 },
  { initials: 'CBK', score: 920 },
  { initials: 'ABC', score: 123 },
  { initials: 'CBD', score: 420 },
  { initials: 'CBK', score: 1000 }
];

partitionMap(scores, x => x.initials);
//» Map {
//»   'ABC' => [ { initials: 'ABC', score: 125 }, { initials: 'ABC', score: 123 } ],
//»   'CBK' => [ { initials: 'CBK', score: 920 }, { initials: 'CBK', score: 1000 } ],
//»   'CBD' => [ { initials: 'CBD', score: 420 } ]
//» }
```

## API

### `partition`

```ts
function partition<T>(
  iterable: Iterable<T>,
  partitionFunction: (value?: T, index?: number, array?: T[]) => boolean
): [T[], T[]];
```

Splits an array into two parts: those where the partition function was truthy,
and those where it was falsy.

### `partitionMap`

```ts
function partitionMap<T, U>(
  iterable: Iterable<T>,
  partitionFunction: (value?: T, index?: number, array?: T[]) => U
): Map<U, T[]>;
```

Creates a `Map` from the returns of the partition function.

```js
partitionMap([1, 2, 3, 4, 5], n => n % 2 == 0);
//» Map(2) { false => [ 1, 3, 5 ], true => [ 2, 4 ] }

const name = n => {
  if (n < 3) return 'small';
  if (n < 7) return 'medium';
  return 'large';
};

partitionMap(new Set([1, 2, 3, 4, 5, 6, 7, 8]), n => name(n));
//» Map(3) {
//»   'small' => [ 1, 2 ],
//»   'medium' => [ 3, 4, 5, 6 ],
//»   'large' => [ 7, 8 ]
//» }
```

## Contributing

[Node.js] and [Yarn] are required to work with this project.

To install all dependencies, run:

```bash
yarn
```

### Useful Commands

|                     |                                                 |
| ------------------- | ----------------------------------------------- |
| `yarn build`        | Builds the project to `./dist`                  |
| `yarn format`       | Format the source following the Prettier styles |
| `yarn test`         | Run project tests                               |
| `yarn test --watch` | Run project tests, watching for file changes    |

## License

MIT

[node.js]: https://nodejs.org/
[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/en/docs/
