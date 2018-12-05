import { createElement } from "./helper";

const tilesPerPage = 3;

export const render = (users, streams, games) => {
    const pagedUsers = [].concat.apply([], users.map((e, i) => i % tilesPerPage ? [] : [users.slice(i, i + tilesPerPage)]));

    const pages = createElement("div", ["twitch-carousel__pages"], null, _renderPages(pagedUsers, streams, games));

    const carousel = createElement("div", ["twitch-carousel"], null, [
        createElement("h2", ["twitch-carousel__title"], null, [ 
            createElement("span", null, null, null, "Streaming") 
        ], "Now"),
        pages,
        createElement("div", ["twitch-carousel__controls"], null, _renderPagingControls(pagedUsers, pages))
    ]);

    const element = document.getElementById("carousel");
    if(element !== null) {
        element.appendChild(carousel);
    }

}

function _renderPages(pagedUsers, streams, games) {
    
    const pages = [];
    for(let page of pagedUsers) {
        pages.push(createElement("div", ["twitch-carousel__page"], null, page.map(user => _renderCard(user, streams, games))))
    }

    return pages;
}

function _renderCard(user, streams, games) {

    const stream = streams.filter(x => x.user_id === user.id)[0];

    let imageUrl = null;
    let isLive = false;
    let gameName = "";
    let viewerCount = 0;

    if(stream === undefined || stream === null) {
        imageUrl = user.offline_image_url;
    } else {
        isLive = true;
        viewerCount = stream.viewer_count;
        imageUrl = stream.thumbnail_url.replace("{width}", "300").replace("{height}", "168");
        gameName = games.filter(x => x.id === stream.game_id)[0].name;
    }

    return createElement("div", ["twitch-carousel__card"], null, [
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
        createElement("div", ["twitch-carousel__card__views"], null, [
            createElement("div", ["twitch-carousel__card__views__indicator"]),
            createElement("span", null, null, null, "Live")

        ])
    ]);
}

function _renderPagingControls(pagedUsers, pages) {
    const controls = [];
    for(let i = 0; i < pagedUsers.length; i ++) {

        const classes = ["twitch-carousel__control"];
        if(i === 0) classes.push("active");

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