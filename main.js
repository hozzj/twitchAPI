// click handlers ui

$(".filter").click(function () {
    $(".filter").removeClass("active");
    $(this).addClass("active");
});

$(".online").click(function () {
    $(".false, .error").css("display", "none");
    $(".true").css("display", "flex");
});

$(".offline").click(function () {
    $(".false, .error").css("display", "flex");
    $(".true").css("display", "none");
});

$(".all").click(function () {
    $(".false, .error, .true").css("display", "flex");
});

let result = function (name, img, link, content, state) {
    return `                <li class="result ${state}">
                    <img class="result-pic" src="${img}">
                    <a class="result-link" href="${link}" target="_blank">${name}</a>
                    <p><a class="status" href="${link}" target="_blank">${content}</a></p>
                </li>`;
}

let channels = [
    {
        name: "ESL_SC2"
        }, {
        name: "OgamingSC2"
        }, {
        name: "cretetion"
        }, {
        name: "freecodecamp"
        }, {
        name: "storbeck"
        }, {
        name: "habathcx"
        }, {
        name: "RobotCaleb"
        }, {
        name: "brunofin"
        }, {
        name: "noobs2ninjas"
}];

for (let i = 0; i < channels.length; i += 1) {
    setTimeout(function () {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + channels[i].name + "?client_id=3p3cj2klkf2x3zyjfswrpwhxbgvcp73&callback=?",
            function (data) {
                channels[i].state = Boolean(data.stream);
                channels[i].link = `https://twitch.tv/${channels[i].name}`
                if (channels[i].state) {
                    channels[i].img = data.stream.channel.logo;
                    channels[i].content = data.stream.channel.status;
                } else {
                    channels[i].img = "https://pixabay.com/static/uploads/photo/2014/11/10/17/48/offline-525700_960_720.png";
                    channels[i].content = "Offline";
                }
                if (data.error) {
                    channels[i].content = "The streamer has closed their account, or the channel never existed";
                    channels[i].link = "#";
                    channels[i].state = "error";
                }
                if (channels[i].state && channels[i].state != "error")
                    $(".results").prepend(result(channels[i].name, channels[i].img, channels[i].link, channels[i].content, channels[i].state));
                else
                    $(".results").append(result(channels[i].name, channels[i].img, channels[i].link, channels[i].content, channels[i].state));
            }
        );
    }, 4);
}