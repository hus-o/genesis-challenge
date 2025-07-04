module.exports = {
  presets: [['@babel/preset-env'], ['@babel/preset-react'], ['@babel/preset-typescript']],
  plugins: [
    ['@babel/transform-runtime', {regenerator: true}],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-transform-typescript']
  ]
};
