#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactNativeTextRecognition, NSObject)

RCT_EXTERN_METHOD(recognize:(NSString *)path 
                 script:(NSString *)script
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
