import * as FileSystem from 'expo-file-system';

const vozoDir = FileSystem.cacheDirectory + 'vozo/';

export async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(vozoDir);
    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(vozoDir, { intermediates: true });
    }
}

function createFilePath(text: string) {
    const vozoFileName = text.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    const vozoFilePath = vozoDir + vozoFileName + '.mp3';
    return vozoFilePath;
}

export async function downloadFile(url: string, text: string) {
    console.log("Downloading file")
    await ensureDirExists();
    const vozoFilePath = createFilePath(text);
    await FileSystem.downloadAsync(url, vozoFilePath);
    return vozoFilePath;
}

export async function deleteFile(vozoFilePath: string) {
    console.log("Deleting file")
    await FileSystem.deleteAsync(vozoFilePath);
}

