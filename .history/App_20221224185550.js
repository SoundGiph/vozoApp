
 import React, { useRef } from 'react';
 import {SafeAreaView, StatusBar, View, Linking} from 'react-native';
 import { WebView } from 'react-native-webview';
 import { onMessage, sendIsOnAppToWebApp, javaScriptToInject } from './utils/messageHandler';
 
 //const VOZO_APP_URL = 'https://dev.vozo.app';
 const VOZO_APP_URL = 'http://192.168.1.38:3000';
 const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
 

 const WebViewWithRef = () => {
  const webViewRef = useRef(WebView);
   return (
     <WebView
       ref={webViewRef}
       injectedJavaScript={javaScriptToInject}
       onMessage={onMessage}
       source={{uri: VOZO_APP_URL}}
       style={{width: '100%', height: '100%', backgroundColor: 'black'}}
       userAgent={USER_AGENT}
       onNavigationStateChange={(event) => {
        if (event.title.includes("oogle")) {
          if (event.url !== VOZO_APP_URL) {
            //webViewRef.current.stopLoading();
            Linking.openURL(event.url);
          }
        }
      }}
     />
   );
 }

 const App = () => {
   return (
     <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
       <View style={{zIndex: 1, backgroundColor: 'black'}}>
         <StatusBar barStyle={'light-content'} backgroundColor="black" />
       </View>
       <WebViewWithRef/>
     </SafeAreaView>
   );
 };
 
 export default App;
 