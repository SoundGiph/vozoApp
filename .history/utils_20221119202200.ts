import { useCallback } from "react";
//import Share from "react-native-share";
//import { Share } from "react-native";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { WebViewMessageEvent } from "react-native-webview";


const vozoDir = FileSystem.cacheDirectory + 'vozo/';

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(vozoDir);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(vozoDir, { intermediates: true });
  }
}

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

      const vozoTitle = param.title.replace(" ", "_");
      const vozoFileName = vozoDir + vozoTitle + '.mp3';
      console.log(param.url);
      console.log(vozoFileName);
      FileSystem.downloadAsync(param.url, vozoFileName)

      Sharing.shareAsync(vozoFileName, {})


    } catch (e: unknown) {
      console.error(e);
    }
  }
}
