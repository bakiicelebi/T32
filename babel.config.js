module.exports = {
  presets: ['module:@react-native/babel-preset'],
<<<<<<< HEAD
  plugins: [
    ['react-native-reanimated/plugin'],
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }]
  ],
=======
  plugins: ['react-native-reanimated/plugin'],
>>>>>>> 53e71564be5b352e820b4091f4327329cde30e3a
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
