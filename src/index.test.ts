import test from 'ava';
import { partition, partitionMap } from './index';

test('partition() partitions into passed/not passed', t => {
  t.deepEqual(
    partition([1, 2, 3, 4, 5], n => n % 2 === 0),
    [
      [2, 4],
      [1, 3, 5]
    ]
  );

  const fixtureUsers = [
    { name: 'Charles', roles: { r: true } },
    { name: 'Blake', roles: { r: true, w: true } },
    { name: 'Josh', roles: { r: true } },
    { name: 'Bryson', roles: { r: true } }
  ];

  t.deepEqual(
    partition(fixtureUsers, u => u.roles.w),
    [
      [{ name: 'Blake', roles: { r: true, w: true } }],
      [
        { name: 'Charles', roles: { r: true } },
        { name: 'Josh', roles: { r: true } },
        { name: 'Bryson', roles: { r: true } }
      ]
    ]
  );

  const fixtureMixedTypes = [
    1,
    'abc',
    false,
    { color: '#f00' },
    null,
    undefined
  ];

  t.deepEqual(
    partition(fixtureMixedTypes, x => !x),
    [
      [false, null, undefined],
      [1, 'abc', { color: '#f00' }]
    ]
  );

  t.deepEqual(
    partition(new Set([1, 2, 3, 4, 5, 6, 7]), n => n % 3 === 0),
    [
      [3, 6],
      [1, 2, 4, 5, 7]
    ]
  );
});

test('partitionMap() partitions into returned values', t => {
  t.deepEqual(
    partitionMap([1, 2, 3, 4, 5], n => n % 2 === 0),
    new Map([
      [false, [1, 3, 5]],
      [true, [2, 4]]
    ])
  );

  const fixtureUsers = [
    { name: 'Charles', roles: { r: true } },
    { name: 'Blake', roles: { admin: true, r: true, w: true } },
    { name: 'Josh', roles: { r: true, w: true } },
    { name: 'Bryson', roles: { r: true, w: true } }
  ];

  interface Role {
    admin?: boolean;
    r?: boolean;
    w?: boolean;
  }

  const roleName = (role: Role) => {
    if (role.admin) return 'admin';
    if (role.w && role.r) return 'read-write';
    if (role.r) return 'read-only';
    return 'unknown';
  };

  t.deepEqual(
    partitionMap(fixtureUsers, u => roleName(u.roles)),
    new Map([
      ['read-only', [{ name: 'Charles', roles: { r: true } }]],
      ['admin', [{ name: 'Blake', roles: { admin: true, r: true, w: true } }]],
      [
        'read-write',
        [
          { name: 'Josh', roles: { r: true, w: true } },
          { name: 'Bryson', roles: { r: true, w: true } }
        ]
      ]
    ])
  );
});
