#!/bin/sh
./node_modules/.bin/tsc test-a11y.ts
node test-a11y.js > results/accessibility-results.json
cd results
../node_modules/.bin/json2html accessibility-results.json # &> /dev/null
cat accessibility-results.json
