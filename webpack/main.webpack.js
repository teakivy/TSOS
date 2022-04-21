module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack'),
  },
};
