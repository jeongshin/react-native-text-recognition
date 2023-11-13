import MLKitVision
import MLKitTextRecognition
import MLKitTextRecognitionKorean
import MLKitTextRecognitionJapanese

@objc(ReactNativeTextRecognition)
class ReactNativeTextRecognition: NSObject {
    func frameToDict(_ frame: CGRect) -> NSDictionary {
        return [
            "width": frame.size.width,
            "height": frame.size.height,
            "top": frame.origin.y,
            "left": frame.origin.x
        ]
    }
    
    func pointsToDicts(_ points: [NSValue]) -> [NSDictionary] {
        var array: [NSDictionary] = []
        for point in points {
            array.append([
                "x": point.cgPointValue.x,
                "y": point.cgPointValue.y
            ])
        }
        return array
    }
    
    func langsToDicts(_ langs: [TextRecognizedLanguage]) -> [NSDictionary] {
        var array: [NSDictionary] = []
        for lang in langs {
            array.append(["languageCode": lang.languageCode ?? ""])
        }
        return array
    }
    
    func lineToDict(_ line: TextLine) -> NSDictionary {
        var dict: [String: Any] = [:]
        
        dict["text"] = line.text
        dict["frame"] = frameToDict(line.frame)
        dict["cornerPoints"] = pointsToDicts(line.cornerPoints)
        dict["recognizedLanguages"] = langsToDicts(line.recognizedLanguages)
        
        var elements: [NSDictionary] = []
        
        for element in line.elements {
            elements.append([
                "text": element.text,
                "frame": frameToDict(element.frame),
                "cornerPoints": pointsToDicts(element.cornerPoints)
            ])
        }
        
        dict["elements"] = elements
        
        return dict as NSDictionary
    }
    
    func blockToDict(_ block: TextBlock) -> NSDictionary {
        var dict: [String: Any] = [:]
        
        dict["text"] = block.text
        dict["frame"] = frameToDict(block.frame)
        dict["cornerPoints"] = pointsToDicts(block.cornerPoints)
        dict["recognizedLanguages"] = langsToDicts(block.recognizedLanguages)
        
        var lines: [NSDictionary] = []
        for line in block.lines {
            lines.append(lineToDict(line))
        }
        
        dict["lines"] = lines
        
        return dict as NSDictionary
    }
    
    @objc
    func recognize(_ path: String, script: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        do {
            guard let imagePath = URL(string: path) else {
                return reject("E_INVALID_IMAGE_URL", "image file path is invalid", nil)
            }
            
            let imageData = try Data(contentsOf: imagePath)
            
            guard let image = UIImage(data: imageData) else {
                return reject("E_IMAGE_LOAD_ERROR", "failed to init UIImage", nil)
            }
            
            let visionImage = VisionImage(image: image)
            
            visionImage.orientation = image.imageOrientation
            
            var options: CommonTextRecognizerOptions?
            
            switch script {
            case "Latin":
                options = TextRecognizerOptions()
            case "Japanese":
                options = JapaneseTextRecognizerOptions()
            case "Korean":
                options = KoreanTextRecognizerOptions()
            default:
                reject("E_INVALID_SCRIPT", "unsupported script", nil)
            }
            
            let textRecognizer = TextRecognizer.textRecognizer(options: options!)
            
            textRecognizer.process(visionImage) { result, error in
                guard error == nil, let result = result else {
                    return reject("E_PROCESS_TEXT_RECOGNITION", "failed to process text recognizer", nil)
                }

                var resultDict: [String: Any] = [:]
//                
//                
                var blocks: [NSDictionary] = []
//                
                for block in result.blocks {
                    blocks.append(self.blockToDict(block))
                }
//                
                resultDict["blocks"] = blocks
//
                resolve(resultDict)
            }
        } catch {
            reject("E_UNKNOWN_ERROR", error.localizedDescription, nil)
        }
    }
}
