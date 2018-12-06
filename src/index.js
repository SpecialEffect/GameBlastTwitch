import { getTwitchUsers, getTwitchStreams, getGames } from "./twitch_client/client";
import { render } from "./render/carousel";

const userNames = _getTwitchUserNames();

if (userNames !== undefined && userNames !== null && typeof userNames[Symbol.iterator] === "function" && userNames.length > 0) {

    render(null, null, null);

    getTwitchUsers(userNames)
        .then(users => {
            getTwitchStreams(users.map(x => x.login))
                .then(streams => {
                    getGames(streams.map(x => x.game_id))
                        .then(games => {
                            render(users, streams, games);
                        })
                });
        });
}

function _getTwitchUserNames() {
    const element = document.querySelector(".twitch-usernames");
    if (element === undefined || element === null) {
        return [];
    }

    return element.innerText.split(",").map(x => x.trim()).filter(x => x);
}