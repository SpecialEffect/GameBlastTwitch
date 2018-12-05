import { getToken } from "./token"; 
import { getFromCache, setToCache } from "./cache";

export const getTwitchUsers = (loginNames) => {

    const url = "https://api.twitch.tv/helix/users?login=" + loginNames.join("&login=");

    return _httpGet(url);
}

export const getTwitchStreams = (loginNames) => {
    const url = "https://api.twitch.tv/helix/streams?user_login=" + loginNames.join("&user_login=");

    return _httpGet(url);
};

export const getGames = (gameIds) => {
    const url = "https://api.twitch.tv/helix/games?id=" + gameIds.join("&id=");

    return _httpGet(url);
}

function _httpGet(url) {
    return new Promise((resolve, reject) => {
        getFromCache(url).then(data => {
            if(data !== null) {
                resolve(data.data);
            }
            else {
                getToken().then(token => {
                    window.fetch(url, {
                        headers: {
                            "Authorization": `Bearer ${token.access_token}`
                        }
                    })
                    .then(data => data.json())
                    .then(json => setToCache(url, json))
                    .then(json => resolve(json.data))
                });
            }
        });
    });
}