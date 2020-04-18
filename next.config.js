module.exports = {
  webpack: function (config) {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.css$/,
        use: "css-loader",
      },
    ];
    return config;
  },
};
