import WebView, { WebViewMessageEvent } from "react-native-webview";
import { ShareVozoFile } from "./fileSharing";
import { osName } from 'expo-device'

interface MessagePayload {
    // ref https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
    url: string;
    text: string;
}

// pass this in WebView onMessage props
export async function onMessage(e: WebViewMessageEvent) {
    const { data } = e.nativeEvent;
    console.log('onMessage', data);
    if (data.startsWith('share:')) {
        try {
            const param: MessagePayload = JSON.parse(data.slice('share:'.length));
            if (param.url == null || param.text == null) {
                return;
            }
            await ShareVozoFile(param.url, param.text);
        } catch (e: unknown) {
            console.error(e);
        }
    }
}


function getIsOnApp() {
    const lowerCaseOsName = osName.toLowerCase()
    if (lowerCaseOsName.includes('android')) return true
    if (lowerCaseOsName.includes('ios')) return true
}

export async function sendIsOnAppToWebApp(webViewRef: React.RefObject<WebView>) {
    const isOnApp = getIsOnApp()
    console.log('isOnApp', isOnApp)
    if (isOnApp) {
        webViewRef.current.postMessage('isOnApp: true')
        console.log('send isOnApp: true')
    }
}


export const javaScriptToInject = `(function(){
    function setCookie(name, value, days) {
    console.log('seting cookie')
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  setCookie('isOnApp', 'true', 1);})`