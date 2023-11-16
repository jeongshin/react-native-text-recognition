import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Button, Text } from 'react-native';
import { recognize } from 'react-native-text-recognition';
import { useImagePicker } from './hooks/useImagePicker';

export default function App() {
  const [imagePath, setImagePath] = useState<string>('');

  const [result, setResult] = useState('');

  const { pickSingleImageWithCrop } = useImagePicker();

  useEffect(() => {
    if (!imagePath) return;
    const startAt = Date.now();
    recognize(`file://${imagePath}`, 'Korean')
      .then((_result) => {
        setResult(
          _result.blocks.reduce((acc, curr) => {
            return acc + `${curr.text}\n`;
          }, `걸린 시간: ${Date.now() - startAt}ms\n\n\n`)
        );
      })
      .catch(console.log);
  }, [imagePath]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{result}</Text>
      <Button
        title="load image"
        onPress={async () => {
          const image = await pickSingleImageWithCrop({
            width: 1024,
            height: 1024,
          });
          if (!image) return;
          setImagePath(image.path);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
