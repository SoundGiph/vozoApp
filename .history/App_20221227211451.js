
 import React, { useRef, useState, useEffect } from 'react';
 import {SafeAreaView, StatusBar, View, Linking, AppState} from 'react-native';
 import { WebView } from 'react-native-webview';
 import { onMessage } from './utils/messageHandler';

 const VOZO_APP_URL = 'https://dev.vozo.app';
 const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
 

 const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setAppState(nextAppState);
    };
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  return appState;
}

 const WebViewWithRef = (props) => {

  const webViewRef = useRef(WebView);
  const appState = useAppState();
  useEffect(() => {
    console.log('App state changed', JSON.stringify(appState))
    if (appState === 'active') {
      console.log('App is active');
      webViewRef.current.reload();
    }
    else {
      console.log('App is inactive');
    }
  }, [appState]);

   return (
     <WebView
       ref={webViewRef}
       onMessage={onMessage}
       source={{uri: VOZO_APP_URL}}
       style={{width: '100%', height: '100%', backgroundColor: 'black'}}
       userAgent={USER_AGENT}
       onNavigationStateChange={(event) => {
        if (event.title.includes("vozo.app")) {
          if (event.url !== VOZO_APP_URL) {
            webViewRef.current.stopLoading();
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
       <WebViewWithRef />
     </SafeAreaView>
   );
 };
 
 export default App;
 