'use strict';

const marble = require('marble');

module.exports = {
  metalComponents: [
    'electric-marble-components',
    'marble-topbar',
  ],
  sassOptions: {
    includePaths: [
      'node_modules',
      marble.src,
    ],
  },
  vendorSrc: [
    'node_modules/marble/build/fonts/**',
  ],
  pathDest: 'dist',
  deployOptions: {
    branch: 'gh-pages',
  },
  envOptions: {
    'gh-pages': {
      basePath: '/js-examples/',
      deployOptions: {
        branch: 'gh-pages'
      }
    }
  },
};
