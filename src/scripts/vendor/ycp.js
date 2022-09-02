/******************************************************
* #### jQuery-Youtube-Channels-Playlist v7.0 ####
* Coded by Ican Bachors 2014.
* https://github.com/bachors/jQuery-Youtube-Channels-Playlist
******************************************************/

$.fn.ycp = function(j) {
    $(this).each(function(i, a) {
        const b = ($(this).attr('id') != null && $(this).attr('id') != undefined ? `#${$(this).attr('id')}` : `.${$(this).attr('class')}`);
        const title = ($(this).data('ycp_title') == undefined ? 'YCP.js' : $(this).data('ycp_title'));
        const channel = $(this).data('ycp_channel');
        const html = `<div class="ycp"><div class="belah ycp_vid_play" title="Play video"></div><div class="belah" id="ycp_youtube_channels${i}"></div></div>`;
        $(this).html(html);
        ycp_list(title, channel, i, b)
    });

    function ycp_list(h, f, k, l) {
        $.ajax({
              url: `https://www.googleapis.com/youtube/v3/playlistItems?part=status,snippet&maxResults=30&playlistId=PLBrUm2lGexiz2tgSlAuO1G0TYS3v1N2pV&key=AIzaSyDmkjVEYh335NqYCRZfNVWhQNVRJioOCS4`,
              dataType: 'json'
            }).done(c => {
            let d = '';
            d += '</div><div class="handap">';
            $.each(c.items, (i, a) => {
                if (c.items[i].status.privacyStatus == "public" ||
                    c.items[i].status.privacyStatus == "unlisted") {
                    const b = c.items[i].snippet.resourceId.videoId;
                    d += `<div class="play" data-vvv="${b}" data-img="${c.items[i].snippet.thumbnails.high.url}" title="${c.items[i].snippet.title}"><div class="thumb"><img src="${c.items[i].snippet.thumbnails.default.url}" alt=" "><span class="tm${i}"></span></div>`;
                    d += `<div class="ycpTitle">${c.items[i].snippet.title}</div></div>`
                }
            });
            d += '</div>';
            $(`${l} .ycp div#ycp_youtube_channels${k}`).html(d);
            if (c.prevPageToken == null || c.prevPageToken == undefined) {
                const e = $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).attr("data-vvv");
                const imag = $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).attr("data-img");
                $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html(`<iframe loading="lazy" src="https://www.youtube.com/embed/${e}?rel=0&autoplay=0&enablejsapi=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`)
                $(`${l} .ycp div#ycp_youtube_channels${k} div`).removeClass('vid-active');
                $(`${l} .ycp div#ycp_youtube_channels${k} div.play:eq(0)`).addClass('vid-active')
            } else {
                $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-prev`).click(() => {
                    g = c.prevPageToken;
                    ycp_list(h, f, g, k, l);
                    return false
                })
            }
            $(`${l} .ycp div#ycp_youtube_channels${k} span.vid-next`).click(() => {
                g = c.nextPageToken;
                ycp_list(h, f, g, k, l);
                return false
            });
            $(`${l} .ycp div#ycp_youtube_channels${k} div.play`).each(function() {
                $(this).click(function() {
                    const a = $(this).attr("data-vvv");
                    const m = $(this).attr("data-img");
                    $(`${l} .ycp div#ycp_youtube_channels${k} div`).removeClass('vid-active');
                    $(this).addClass('vid-active');
                    $(`${l} .ycp div.ycp_vid_play:eq(${k})`).html(`<iframe loading="lazy" src="https://www.youtube.com/embed/${a}?rel=0&autoplay=1&enablejsapi=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`);
                    return false
                })
            });
            $(`${l} .ycp div.ycp_vid_play:eq(${k})`).click(function() {
                const a = $(`${l} .ycp div#ycp_youtube_channels${k} div.play.vid-active`).attr("data-vvv");
                $(this).html(`<iframe loading="lazy" src="https://www.youtube.com/embed/${a}?rel=${j.related ? 1 : 0}&amp;autoplay=1&enablejsapi=1" allowfullscreen="" frameborder="0" class="bingkay"></iframe>`);
                return false
            })
        })
    }
}
