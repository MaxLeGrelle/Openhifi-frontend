import anime from "animejs"

function loadingAnimation() {
    $("#loading-wrapper").empty()
    $("#loading-wrapper").css("display", "")
    $("#loading-wrapper").append(`
    <div id="loading1" class='loading'></div>
    <div id="loading2" class='loading'></div>
    <div id="loading3" class='loading'></div>
    <div id="loading4" class='loading'></div>
    <div id="loading5" class='loading'></div>
    `)
    $("#page").css("display", "none")
    anime({
        targets: ".loading",
        translateY: [{
                value: -100,
                duration: 1000
            },
            {
                value: 0,
                duration: 1000
            }
        ],
        loop: true,
        delay: anime.stagger(100)
    })
}

function removeLoadingAnimation() {
    $("#loading-wrapper").fadeOut("slow")
    $("#page").css("display", "")
}

export {loadingAnimation, removeLoadingAnimation}