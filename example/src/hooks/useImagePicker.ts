import { useCallback } from 'react';
import ImagePicker, { type Image } from 'react-native-image-crop-picker';

export interface CropOptions {
  width?: number;
  height?: number;
}

const useImagePicker = () => {
  const pickSingleImageWithCrop = useCallback(
    async ({ width, height }: CropOptions): Promise<Image | null> => {
      try {
        const file = await ImagePicker.openPicker({
          mediaType: 'photo',
          width,
          height,
          freeStyleCropEnabled: true,
          cropping: true,
          cropperCancelText: '취소',
          cropperChooseText: '확인',
          cropperToolbarTitle: '영역 선택',
          compressImageQuality: 0.9,
          compressImageMaxHeight: height,
          compressImageMaxWidth: width,
          loadingLabelText: '업로드 진행중',
          forceJpg: true,
          includeBase64: true,
        });

        return file;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    []
  );

  const openCameraWithCrop = useCallback(
    async ({ width, height }: CropOptions): Promise<Image | null> => {
      try {
        const file = await ImagePicker.openCamera({
          mediaType: 'photo',
          width,
          height,
          freeStyleCropEnabled: true,
          cropping: true,
          cropperCancelText: '취소',
          cropperChooseText: '확인',
          cropperToolbarTitle: '영역 선택',
          compressImageQuality: 0.9,
          compressImageMaxHeight: height,
          compressImageMaxWidth: width,
          loadingLabelText: '업로드 진행중',
          forceJpg: true,
          includeBase64: true,
        });

        return file;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    []
  );

  return { pickSingleImageWithCrop, openCameraWithCrop };
};

export { useImagePicker };
