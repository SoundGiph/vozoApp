
 import React, { useRef } from 'react';
 import {SafeAreaView, StatusBar, View, Linking} from 'react-native';
 import {WebView} from 'react-native-webview';
 import { onMessage, sendIsOnAppToWebApp } from './utils/messageHandler';
 
 const VOZO_APP_URL = 'http://192.168.1.38:3000';
 const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
 
 const App = () => {
  const webViewRef = useRef(null);
   return (
     <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
       <View style={{zIndex: 1, backgroundColor: 'black'}}>
         <StatusBar barStyle={'light-content'} backgroundColor="black" />
       </View>
       <WebView
         ref={webViewRef}
         onLoad={sendIsOnAppToWebApp}
         onMessage={onMessage}
         source={{uri: VOZO_APP_URL}}
         style={{width: '100%', height: '100%', backgroundColor: 'black'}}
         userAgent={USER_AGENT}
         onShouldStartLoadWithRequest={(request) => {
          if (request.url !== VOZO_APP_URL) {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
       />
     </SafeAreaView>
   );
 };
 
 export default App;
 