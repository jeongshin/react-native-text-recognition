import { NativeModules, Platform } from 'react-native';
import type { TextRecognitionResponse } from './types';

const LINKING_ERROR =
  `The package 'react-native-text-recognition' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ReactNativeTextRecognition = NativeModules.ReactNativeTextRecognition
  ? NativeModules.ReactNativeTextRecognition
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const SupportedScript = {
  Korean: 'Korean',
  Latin: 'Latin',
  Japanese: 'Japanese',
} as const;

export async function recognize(
  path: string,
  script: keyof typeof SupportedScript
): Promise<TextRecognitionResponse> {
  return await ReactNativeTextRecognition.recognize(path, script);
}
