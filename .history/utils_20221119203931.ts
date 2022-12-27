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
      //how to remove special characters

      let vozoTitle = param.text?.replace(/ /g, '_');
      vozoTitle = vozoTitle?.replace(/[^a-zA-Z0-9_]/g, '');
      const vozoFileName = vozoDir + vozoTitle + '.mp3';
      console.log(param.url);
      console.log(vozoFileName);
      await ensureDirExists();
      FileSystem.downloadAsync(param.url, vozoFileName).then(() => {
        Sharing.shareAsync(vozoFileName).then(() => {
          FileSystem.deleteAsync(vozoFileName);
        });
      })

    } catch (e: unknown) {
      console.error(e);
    }
  }
}
