import { WebViewMessageEvent } from "react-native-webview";
import { ShareVozoFile } from "./fileSharing";


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
