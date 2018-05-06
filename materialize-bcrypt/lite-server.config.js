module.exports = {
  injectChanges: false,
  files: ['./**/*.{html,js,css}'],
  watchOptions: { ignored: 'node_modules' },
  server: { baseDir: './dist/' }
};
