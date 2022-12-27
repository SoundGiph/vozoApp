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
}

// pass this in WebView onMessage props
export const onMessage = async (e: WebViewMessageEvent) => {

  const { data } = e.nativeEvent;
  if (data.startsWith('share:')) {
    try {
      const param: WebShareAPIParam = JSON.parse(data.slice('share:'.length));
      if (param.url == null || param.text == null) {
        return;
      }
      //how to remove special characters


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
