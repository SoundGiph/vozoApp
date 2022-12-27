
 import React, { useRef, useState } from 'react';
 import {SafeAreaView, StatusBar, View, Linking} from 'react-native';
 import { WebView } from 'react-native-webview';
 import { onMessage } from './utils/messageHandler';
 import { Link } from 'next/app';

 
 const VOZO_APP_URL = 'https://dev.vozo.app';
 const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
 


function useAppState() {
  const [appState, setAppState] = useState('active');

  useEffect(() => {
    // Listen for changes in the app state
    const handleAppStateChange = () => {
      setAppState(document.hasFocus() ? 'active' : 'background');
    };
    window.addEventListener('focus', handleAppStateChange);
    window.addEventListener('blur', handleAppStateChange);

    return () => {
      // Remove the app state listeners
      window.removeEventListener('focus', handleAppStateChange);
      window.removeEventListener('blur', handleAppStateChange);
    };
  }, []);
  return appState;
}

 const WebViewWithRef = () => {
  const webViewRef = useRef(WebView);
   return (
     <WebView
       ref={webViewRef}
       onMessage={onMessage}
       source={{uri: VOZO_APP_URL}}
       style={{width: '100%', height: '100%', backgroundColor: 'black'}}
       userAgent={USER_AGENT}
       onNavigationStateChange={(event) => {
          if (event.url !== VOZO_APP_URL) {
            webViewRef.current.stopLoading();
            Linking.openURL(event.url);
          }
      }}
     />
   );
 }

 const App = () => {
  const appState = useAppState()
  if (appState === 'active') {
    Link.open("vozo://")
    return;
  }
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
 