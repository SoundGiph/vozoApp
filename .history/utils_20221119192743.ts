import { useCallback } from "react";
//import Share from "react-native-share";
import { Share } from "react-native";
import { WebViewMessageEvent } from "react-native-webview";

interface WebShareAPIParam {
  // ref https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
  url?: string;
  text?: string;
  title?: string;
}

// pass this in WebView onMessage props
export const onMessage = async (e: WebViewMessageEvent) => {

  const { data } = e.nativeEvent;
  console.log(data);
  if (data.startsWith('share:')) {
    try {
      const param: WebShareAPIParam = JSON.parse(data.slice('share:'.length));
      if (param.url == null && param.title == null) {
        return;
      }

      const blob = await fetch(param.url).then(res => res.blob());
      const file = new File([blob], "title.mp3", { type: "audio/mp3" });
      const filesArray = [file];


      console.log(filesArray);

      await Share.share(
        {
          title: param.title,
          url: param.url,
        }
      );
    } catch (e: unknown) {
      console.error(e);
    }
  }
}
