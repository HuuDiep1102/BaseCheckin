module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png'
        ],
        alias: {
          '@': './src'
        },
      },
    ],
  ],
};
