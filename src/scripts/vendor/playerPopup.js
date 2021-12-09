export const  onClickVideoOn = function (address, isYouTube=true)  {
    var link = "";


	if(isYouTube==true) {
		link = '"https://www.youtube.com/embed/' + address + '?rel=0&autoplay=1"';
	}
	else {
		link = 'https://player.vimeo.com/video/' + address + '?title=0&byline=0&portrait=0'
	}

  var html = "";
  html += '<div id="videoInner" class="innerWrapper" style="width:100%;">';
  html +=		'<iframe width="1916" height="1076" src=' + link + ' frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  html +=		'<a onclick="onClickVideoOff();">';
  html +=			'<img class="closeVideo" src="https://s3.motionvfx.com/mvfxpublic/images/mdust/tuts/x.png" />';
  html +=		'</a>';
  html += '</div>';

  var elVideo = document.getElementById("videoPopUp");

  if(elVideo) {
    elVideo.innerHTML = html;
    elVideo.style.display = 'block';
    elVideo.style.position = 'fixed';
    elVideo.style.width = '100%';
    elVideo.style.height = '100%';
    elVideo.style.background = 'rgba(0,0,0,0.8)';
    elVideo.style.top = '0';
  }


  var elVideoInner = document.getElementById("videoInner");

  if(elVideoInner) {
    elVideoInner.style.marginTop = '-12vw';
    elVideoInner.style.position = 'fixed';
    elVideoInner.style.top ='50%';
  }
}

export const onClickVideoOff = function ()  {
  var elPopUp = document.getElementById("videoPopUp");

  if(elPopUp) {
    document.getElementById("videoPopUp").style.display = 'none';
    document.getElementById("videoPopUp").innerHTML = '';
  }
}

// $(document).ready(function() {
//     AOS.init();
// });
