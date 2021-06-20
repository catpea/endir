#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();
program.version('0.0.1');

import application from './application.js';

program

  .option('-v, --verbose', 'Be verbose.')
  .option('-d, --dry', 'Dryrun, explain changes, but do not write them to disk.')
  .option('-l, --list', 'Prints a verbose JSON report of all changes.')

  .option('-r, --root <directory>', 'Root directory of where to begin operations.')
  .option('-g, --glob <pattern>', 'glob pattern', '**/*.{html}')
  .option('-p, --prefix <path>', 'directory prefix');

program.parse(process.argv);
const options = program.opts();

const report = options.list?[]:undefined;
const verbose = options.verbose;
const dry = options.dry;
const cwd = options.root;
const pattern = options.glob;
const prefix = options.prefix;

await application({ dry, verbose, prefix, pattern, cwd, report });

if(options.list) console.log(report);
