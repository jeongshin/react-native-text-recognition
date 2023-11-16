export interface TextRecognitionResponse {
  blocks: Block[];
}

export interface Block {
  recognizedLanguages: RecognizedLanguage[];
  text: string;
  lines: Line[];
  cornerPoints: CornerPoint[];
  frame: Frame;
}

export interface Line {
  cornerPoints: CornerPoint[];
  text: string;
  frame: Frame;
  elements: Element[];
  recognizedLanguages: RecognizedLanguage[];
}

export interface Element {
  cornerPoints: CornerPoint[];
  text: string;
  frame: Frame;
}

export interface Frame {
  height: number;
  left: number;
  width: number;
  top: number;
}

export interface CornerPoint {
  y: number;
  x: number;
}

export interface RecognizedLanguage {
  languageCode: string;
}
