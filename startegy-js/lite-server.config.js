module.exports = {
  injectChanges: false,
  files: ['./**/*.{html,js}'],
  watchOptions: { ignored: 'node_modules' },
  server: { baseDir: './dist/' }
};
