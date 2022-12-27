import * as Sharing from 'expo-sharing';
import { downloadFile, deleteFile } from './fileSytem';


export async function ShareVozoFile(url: string, text: string) {
    const vozoFilePath = await downloadFile(url, text);
    await Sharing.shareAsync(vozoFilePath)
    await deleteFile(vozoFilePath);
}
