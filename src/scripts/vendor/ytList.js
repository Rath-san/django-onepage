function getVimeoLink(num) {
    var links = [
        "empty",
        /*  1 */ "XW_58_yh5p8",
        /*  2 */ "nirW0KYrXno",
        /*  3 */ "naeq-LY-zBk",
        /*  4 */ "d93t7XJkC0U",
        /*  5 */ "xmj6kQ59CIo",
        /*  6 */ "arTrST1iRO4",
        /*  7 */ "9dNQZJzUYj8",
        /*  8 */ "KYsKS6p3RzQ",
        /*  9 */ "-HPfltTxSSM",
        /* 10 */ "YXhRaMoO1HI",
        /* 11 */ "Gfj8SBkIKws",
        /* 12 */ "TRDbX47DBqc",
        /* 13 */ "cNze42_TyvM",
        "",
    ];

    maxCount = links.length - 2;

    return links[num + startCount];
}

function getDesc(num) {
    var links = [
        "empty",
        /*  1 */ "01 - Overview",
        /*  2 */ "02 - Color Correction",
        /*  3 */ "03 - White Balance",
        /*  4 */ "04 - Levels",
        /*  5 */ "05 - Basic Adjustments",
        /*  6 */ "06 - Off-screen Lens Flare Effects",
        /*  7 */ "07 - LUT management",
        /*  8 */ "08 - Aberration",
        /*  9 */ "09 - Lens Distortion",
        /* 10 */ "10 - Lens Blur",
        /* 11 */ "11 - Film Grain",
        /* 12 */ "12 - Vignette",
        /* 13 */ "13 - Letterbox",
        "",
    ];
    return links[num + startCount];
}

function setMainVideo(num) {
    var elementiFrame = document.getElementById("tutorialiFrame");

    if (elementiFrame) {
        var link = getVimeoLink(num);
        elementiFrame.src =
            "https://www.youtube.com/embed/" + link + "?rel=0&autoplay=1";
    }
}

function hightlight(num) {
    for (var i = 1; i <= 4; i++) {
        var element = document.getElementById("vidListLi" + i);
        if (element) {
            element.style.filter = i == num ? "opacity(100%)" : "opacity(40%)";
        }
    }
}

function setThumbAndDesc(num) {
    var element = document.getElementById("thumb" + num);

    if (element) {
        var link = getVimeoLink(num);
        var desc = getDesc(num);

        var html =
            '<img class="img-fluid" src="https://img.youtube.com/vi/' +
            link +
            '/sddefault.jpg" />';
        html += '<div class="desc">' + desc + "</div>";
        element.innerHTML = html;
    }
}

function clickOnVideo(num) {
    previousNum = num + startCount;

    setMainVideo(num);
    hightlight(num);
}

function arrowsVisibility() {
    var arrowLeft = document.getElementById("arrow-left");
    var arrowRight = document.getElementById("arrow-right");

    arrowLeft.style.visibility = startCount == 0 ? "hidden" : "visible";
    arrowRight.style.visibility =
        startCount == maxCount - 4 ? "hidden" : "visible";
}

function moveLeftRight(num) {
    var element = document.getElementById("vidList");
    if (element) {
        element.style.opacity = 0;
    }

    startCount += num * 4;

    if (startCount < 0) {
        startCount = 0;
    }

    if (startCount + 4 > maxCount) {
        startCount = maxCount - 4;
    }

    arrowsVisibility();

    setTimeout(function () {
        if (element) {
            refresh();

            if (
                previousNum >= startCount + 1 &&
                previousNum <= startCount + 5
            ) {
                hightlight(previousNum - startCount);
            } else {
                hightlight(0);
            }

            element.style.opacity = 1;
        }
    }, 300);
}

function refresh() {
    for (var i = 4; i >= 1; i--) {
        setThumbAndDesc(i);
    }
}

//create 4 images and arrows
function createHtml() {
    var html = "";

    for (var i = 1; i <= 4; i++) {
        if (i == 1) {
            html +=
                ' <div id="tutorialContainer" class="yt embed-responsive embed-responsive-16by9">';
            html +=
                '   <iframe id="tutorialiFrame" src="https://www.youtube.com/embed/' +
                getVimeoLink(1) +
                '?rel=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
            html += " </div>";
            html += ' <div class="div-vid-list">';
            html += '   <ol id="vidList" class="vid-list">';
        }

        html +=
            '       <li id="vidListLi' +
            i +
            '"><a id="href' +
            i +
            '" onclick="clickOnVideo(' +
            i +
            ');"><span id="thumb' +
            i +
            '" class="vid-thumb"></span></a></li>';

        if (i == 4) {
            html += "   </ol>";
            html += '   <div id="arrow-left" class="arrow-left">';
            html += '     <a onclick="moveLeftRight(-1);">';
            html +=
                '       <img src="https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/arrow_left.png" />';
            html += "     </a>";
            html += "   </div>";
            html += '   <div id="arrow-right" class="arrow-right">';
            html += '     <a onclick="moveLeftRight(1);">';
            html +=
                '       <img src="https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/arrow_right.png" /></div>';
            html += "     </a>";
            html += "   </div>";
            html += " </div>";
        }
    }

    var element = document.getElementById("mainTutorialContainer");

    if (element) {
        element.innerHTML = html;
    }
}

function loadImages() {
    var element = document.getElementById("mainTutorialContainer");

    if (element) {
        var html = element.innerHTML;

        for (var i = 1; i <= maxCount; i++) {
            var link = getVimeoLink(i);

            html +=
                '<img style="width:0; height:0;" src="https://img.youtube.com/vi/' +
                link +
                '/sddefault.jpg" />';
        }

        element.innerHTML = html;
    }
}

var startCount = 0;
var previousNum = 1;
var maxCount = 0;

$(document).ready(function () {
    //set maxCount
    getVimeoLink(0);

    //create html list
    createHtml();
    hightlight(1);

    //
    loadImages();

    //load 4 images on start
    refresh();
});
