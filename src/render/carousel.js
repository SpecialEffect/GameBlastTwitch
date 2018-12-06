import { createElement } from "./helper";

const tilesPerPage = 3;

export const render = (users, streams, games) => {

    const carousel = createElement("div", ["twitch-carousel"]);


    if (users !== null && streams !== null && games !== null) {
        const sorted = users.sort((a,b) => _isUserLive(a, streams) ? -1 : 1);

        const pagedUsers = [].concat.apply([], sorted.map((e, i) => i % tilesPerPage ? [] : [sorted.slice(i, i + tilesPerPage)]));
        const pages = createElement("div", ["twitch-carousel__pages"], null, _renderPages(pagedUsers, streams, games));
        carousel.appendChild(createElement("h2", ["twitch-carousel__title"], null, [createElement("span", null, null, null, "Streaming")], "Now"));
        carousel.appendChild(createElement("div", ["twitch-carousel__padding"], null, [pages]));
        carousel.appendChild(createElement("div", ["twitch-carousel__controls"], null, _renderPagingControls(pagedUsers, pages)));
    }

    _insertElement(carousel)
}

function _insertElement(carousel) {
    const element = document.getElementById("carousel");
    if (element !== null) {
        while (element.firstElementChild) {
            element.firstElementChild.remove();
        }
        element.appendChild(carousel);
    }
}

function _renderPages(pagedUsers, streams, games) {

    const pages = [];
    for (let page of pagedUsers) {
        pages.push(createElement("div", ["twitch-carousel__page"], null, page.map(user => _renderCard(user, streams, games))))
    }

    return pages;
}

function _renderCard(user, streams, games) {

    const stream = _getStreamForUser(user, streams);

    let imageUrl = null;
    let isLive = false;
    let gameName = "";
    let viewerCount = 0;

    if (stream === undefined || stream === null) {
        imageUrl = user.offline_image_url;
    } else {
        isLive = true;
        viewerCount = stream.viewer_count;
        imageUrl = stream.thumbnail_url.replace("{width}", "300").replace("{height}", "168");
        gameName = games.filter(x => x.id === stream.game_id)[0].name;
    }


    const card = createElement("div", ["twitch-carousel__card"], null, [
        createElement("img", ["twitch-carousel__card__image"], [
            { name: "src", value: imageUrl }
        ]),
        createElement("div", ["twitch-carousel__card__info"], null, [
            createElement("span", ["twitch-carousel__card__info__name"], null, null, user.display_name),
            createElement("span", ["twitch-carousel__card__info__playing"], null, [
                createElement("p", null, null, null, gameName),
                createElement("p", null, null, null, viewerCount + " viewers")
            ])
        ]),
    ]);

    if (isLive) {
        card.appendChild(createElement("div", ["twitch-carousel__card__views"], null, [
            createElement("div", ["twitch-carousel__card__views__indicator"]),
            createElement("span", null, null, null, "Live")

        ]));
    }

    card.addEventListener("click", () => {
        window.open(`https://www.twitch.tv/${user.login}`, "_blank")
    });

    return card;
}

function _renderPagingControls(pagedUsers, pages) {
    const controls = [];
    for (let i = 0; i < pagedUsers.length; i++) {

        const classes = ["twitch-carousel__control"];
        if (i === 0) classes.push("active");

        const control = createElement("div", classes);
        controls.push(control);
        control.addEventListener("click", () => {
            pages.style.transform = `translateX(-${i * 100}%)`;
            controls.forEach(x => x.classList.remove("active"));
            controls[i].classList.add("active");
        });
    }
    return controls;
}

function _isUserLive(user, streams) {
    return _getStreamForUser(user, streams) !== null;
}

function _getStreamForUser(user, streams) {
    const stream =  streams.filter(x => x.user_id === user.id)[0];
    if(stream !== undefined && stream !== null) {
        console.debug(`${user.display_name} has stream with id ${stream.id}`);
        return stream;
    } else {
        console.debug(`${user.display_name} is not streaming`)
        return null;
    }
}