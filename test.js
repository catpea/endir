#!/usr/bin/env node
import assert from "assert";
import application from './application.js';

// const cmd = `./index.js --dry --root ./ --prefix /flarp --glob '**/*.{html}'`;
const dry = true;
const verbose = false;
const prefix = '/flarp';
const pattern = `**/*.{html}`;
const cwd = './test/root';
const entries = 'a:href,link:href,img:src,script:src';

const report = [];
await application({ dry, verbose, prefix, pattern, cwd, report, entries });

const actual = report;
const expected = [
  [ 'root.html', '/favicon.ico', '/flarp/favicon.ico' ],
  [
    'root.html',
    '/css/bootstrap.min.css',
    '/flarp/css/bootstrap.min.css'
  ],
  [
    'root.html',
    '/images/firefox-icon.png',
    '/flarp/images/firefox-icon.png'
  ],
  [
    'root.html',
    '/js/bootstrap.bundle.min.js',
    '/flarp/js/bootstrap.bundle.min.js'
  ],
  [ 'subdir/sub.html', '/favicon.ico', '/flarp/favicon.ico' ],
  [
    'subdir/sub.html',
    '/css/bootstrap.min.css',
    '/flarp/css/bootstrap.min.css'
  ],
  [
    'subdir/sub.html',
    '/images/firefox-icon.png',
    '/flarp/images/firefox-icon.png'
  ],
  [
    'subdir/sub.html',
    '/js/bootstrap.bundle.min.js',
    '/flarp/js/bootstrap.bundle.min.js'
  ]
]

assert.deepEqual(actual, expected);
