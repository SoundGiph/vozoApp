import * as Linking from 'expo-linking';
import { URLSearchParams } from 'url';
import { useEffect, useState } from 'react';

export const useSchemeUrlParams = () => {

    const schemeUrl = 'vozo://main';
    const [accessToken, setAccessToken] = useState("")
    useEffect(() => {
        const handleUrl = ({ url }) => {
            const parsedUrl = new URL(url);

            if (parsedUrl.origin === schemeUrl) {
                const params = new URLSearchParams(parsedUrl.search);
                setAccessToken(params.get('access_token'));
            }
        };

        Linking.addEventListener('url', handleUrl);

        return () => {
            Linking.removeEventListener('url', handleUrl);
        };
    }, [accessToken]);

    return accessToken;
}

