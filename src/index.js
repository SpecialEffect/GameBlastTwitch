import { getTwitchUsers, getTwitchStreams, getGames } from "./twitch_client/client";
import { render } from "./render/carousel";

getTwitchUsers(["xgladd", "kinggothalion", "professorbroman", "dakotaz", "symfuhny"])
    .then(users => {
    getTwitchStreams(users.map(x => x.login))
        .then(streams => {
        getGames(streams.map(x => x.game_id))
            .then(games => {
                render(users, streams, games);
        })
    });
});