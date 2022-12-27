import { useCallback } from "react";
import { Share } from "react-native"
import { WebViewMessageEvent } from "react-native-webview";

interface WebShareAPIParam {
  // ref https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
  url?: string;
  text?: string;
  title?: string;
}

// pass this in WebView onMessage props
export const onMessage = useCallback(async (e: WebViewMessageEvent) => {
  const { data } = e.nativeEvent;
  if (data.startsWith('share:')) {
    try {
      const param: WebShareAPIParam = JSON.parse(data.slice('share:'.length));
      if (param.url == null && param.title == null) {
        return;
      }
      await Share.share(
        {
          title: param.title,
          url: param.url
        },
        {
          dialogTitle: param.title,
          subject: param.title,
        },
      );
    } catch (e: unknown) {
      console.error(e);
    }
  }
}, []);

export const injectedJavaScriptBeforeContentLoaded = `
if (navigator.share == null) {
  navigator.share = (param) => {
     window.ReactNativeWebView.postMessage('share:' + JSON.stringify(param));
  };
};
true;
`;