
 import React from 'react';
 import {SafeAreaView, StatusBar, View, Linking} from 'react-native';
 import {WebView} from 'react-native-webview';
 import { onMessage } from './utils/messageHandler';
 import { postDeviceIdToWebApp } from './utils/deviceId';
 
 const VOZO_APP_URL = 'https://dev.vozo.app/';
 const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
 
 const App = () => {
  postDeviceIdToWebApp()
   return (
     <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
       <View style={{zIndex: 1, backgroundColor: 'black'}}>
         <StatusBar barStyle={'light-content'} backgroundColor="black" />
       </View>
       <WebView 
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
 