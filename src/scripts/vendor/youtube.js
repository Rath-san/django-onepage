$.fn.initYTPlaylist = function(playlistId)
{
    let $root = $(this);

    getVideos();

    function getVideos(next=null) {
        let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=status,snippet&maxResults=25&playlistId=' + playlistId + '&key=AIzaSyDmkjVEYh335NqYCRZfNVWhQNVRJioOCS4'
        if (next != null) url += '&pageToken=' + next;
        $.ajax({url: url, dataType: 'json'}).done(function(data){ processData(data) });
    }

    function processData(data) {
        let $menu = $root.find('.yt-menu');
        let content = $root.find('.yt-content');

        $.each(data.items, (index, item) => {
            if (item.status.privacyStatus == "public") {
                let menuItem = '<div class="media">';
                menuItem += '   <a class="menu-item" data-src="' + item.snippet.resourceId.videoId + '">';
                menuItem += '   <div class="media-left">';
                menuItem += '       <img width="120" height="90" class="media-object" data-src="' + item.snippet.thumbnails.default.url + '" alt="...">';
                menuItem += '   </div>';
                menuItem += '   <div class="media-body">';
                menuItem += '     <h6 class="media-heading">' + item.snippet.title + '</h6>';
                menuItem += '   </div>';
                menuItem += '   </a>';
                menuItem += ' </div>';
                $menu.append(menuItem);
            }
        });

        if (data.nextPageToken != null) {
            getVideos(data.nextPageToken);
        }
        else{
            initItems();
        }
    }

    function clearActive() {
        $.each($root.find('.menu-item'), (index, item) => {
            let $item = $(item);
            $item.parent().removeClass('active');
        });
    }

    function initItems() {
        $.each($root.find('.menu-item'), (index, item) => {
            let $item = $(item);
            $item.on('click', function() {
               clearActive();
               $item.parent().addClass('active');
               let $content = $root.find('.yt-content');
               $content.html('<div class="embed-responsive embed-responsive-16by9">\n' +
                             '  <iframe loading="lazy" title="Playlist" class="embed-responsive-item" data-src="https://www.youtube.com/embed/' + $item.data("src") + '" allowfullscreen></iframe>\n' +
                             '</div>');
            });
        });
        $root.find('.menu-item').first().click();
    }
}


$(document).ready(function() {
    $("#playlist").initYTPlaylist('PLBrUm2lGexiz2tgSlAuO1G0TYS3v1N2pV');
});
