import { twitchOptions } from "./options";
import { debug } from "util";

export const getToken = () => {
    return new Promise((resolve, reject) => {
        _getFromStorage().then(token => {
            if(token !== null && !_hasExpired(token)) {
                console.debug("Got token from storage")
                resolve(token);
            } else {
                _getFromApi().then(_setToStorage).then(resolve);
            }
        });
    });
}

function _getFromStorage() {
    return new Promise((resolve, reject) => {
        const token = window.localStorage.getItem(twitchOptions.storageKey);
        resolve(token === null ? null : JSON.parse(token));
    });
}

function _setToStorage(token) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + token.expires_in);
    token.expires_at = date;
    return new Promise((resolve, reject) => {
        window.localStorage.setItem(twitchOptions.storageKey, JSON.stringify(token));
        resolve(token);
    })
}

function _getFromApi() {
    const url = `https://id.twitch.tv/oauth2/token` +
    `?client_id=${twitchOptions.clientId}` +
    `&client_secret=${twitchOptions.clientSecret}` +
    `&grant_type=client_credentials`;

    return new Promise((resolve, reject) => {
        window.fetch(url, {
            method: "POST"
        })
        .then(data => data.json())
        .then(_setToStorage)
        .then(resolve);
    });
}

function _hasExpired(token) {
    const expiresAt = new Date(token.expires_at);
    const now = new Date();

    return expiresAt < now;

}