export default ($root, playlistId) => {
    getVideos();

    function getVideos(next = null) {
        let url =
            "https://www.googleapis.com/youtube/v3/playlistItems?part=status,snippet&maxResults=25&playlistId=" +
            playlistId +
            "&key=AIzaSyCw2H3QPX6qpkvU_dn0q8o1PGgHyPw2kIc";
        if (next != null) url += "&pageToken=" + next;
        $.ajax({ url: url, dataType: "json" }).done(function (data) {
            processData(data);
        });
    }

    function processData(data) {
        let $menu = $root.find(".yt-menu");
        let content = $root.find(".yt-content");

        $.each(data.items, (index, item) => {
            let status = item.status.privacyStatus;
            if (status == "public" || status == "unlisted") {
                let menuItem = '<div class="media">';
                menuItem +=
                    '   <a class="menu-item" data-src="' +
                    item.snippet.resourceId.videoId +
                    '">';
                menuItem += '   <div class="media-left">';
                menuItem +=
                    '       <img class="media-object" src="' +
                    item.snippet.thumbnails.default.url +
                    '" alt="...">';
                menuItem += "   </div>";
                menuItem += '   <div class="media-body">';
                menuItem +=
                    '     <h6 class="media-heading">' +
                    item.snippet.title +
                    "</h6>";
                menuItem += "   </div>";
                menuItem += "   </a>";
                menuItem += " </div>";
                $menu.append(menuItem);
            }
        });

        if (data.nextPageToken != null) {
            getVideos(data.nextPageToken);
        } else {
            initItems();
        }
    }

    function clearActive() {
        $.each($root.find(".menu-item"), (index, item) => {
            let $item = $(item);
            $item.parent().removeClass("active");
        });
    }

    function initItems() {
        $.each($root.find(".menu-item"), (index, item) => {
            let $item = $(item);
            $item.on("click", function () {
                clearActive();
                $item.parent().addClass("active");
                let $content = $root.find(".yt-content");
                $content.html(
                    '<div class="embed-responsive embed-responsive-16by9">\n' +
                        '  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' +
                        $item.data("src") +
                        '" allowfullscreen></iframe>\n' +
                        "</div>"
                );
            });
        });
        $root.find(".menu-item").first().click();
    }

    if (location.hash) {
        const aid = location.hash.slice(1);
        var aTag = $("a[xname='" + aid + "']").get(0);
        if (aTag) {
            const top = aTag.getBoundingClientRect().top;
            $("html,body").scrollTop(top);
            //$('html,body').animate({scrollTop: $(aTag).offset().top+$(aTag).height()},'slow');
        }
    }
};
