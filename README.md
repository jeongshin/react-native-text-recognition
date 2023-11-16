# react-native-text-recognition

## Features

- Using text recolonization API from [Google ML Kit](https://developers.google.com/ml-kit?hl=ko) ✨
- Written in Swift & Kotlin + Typescript ✍🏻
- `Latin`, `Korean`, `Japanese` script support 🔠

## Installation

```bash
yarn add react-native-text-recognition
```

## Example

```ts
import {
  recognize,
  TextRecognitionResponse,
} from 'react-native-text-recognition';

recognize(`path-to-image`, 'Latin').then((result: TextRecognitionResponse) => {
  const text = result.blocks.reduce((acc, curr) => {
    return acc + `${curr.text}\n`;
  }, '');
});
```

## License

[MIT](./LICENSE)
