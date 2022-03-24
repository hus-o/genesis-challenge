module.exports = {
  presets: [["@babel/preset-env"]],
  plugins: [
    ["@babel/transform-runtime", { regenerator: true}],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-typescript"]
  ],
};
