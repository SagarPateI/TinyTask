module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      [
        'module:react-native-dotenv',
        {
          // Configuration options for react-native-dotenv
          "envName": "APP_ENV",
          "moduleName": "@env",
          "path": ".env"
        }
      ]
    ],
  };
};
