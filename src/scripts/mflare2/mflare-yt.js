showTuts();

function showTuts() {

	const playControl = "<img class='play' src='https://s3.motionvfx.com/mvfxpublic/images/mflare2/images/Play.png' alt=''/>";
	const playerTemplate = (id, text) => `
	<a  role='button' onclick='onClickVimeoOn(${id});' onmouseover='onHover(${id});' onmouseout='offHover(${id});'>
		<div class='box ${id > 3 ? "bottom" : ""}'>
			<div id='time${id}' class='time'></div>
			<img loading='lazy' id='tut${id}' src='' alt='' />
			${playControl}
			<div class='desc'>
				${text}
			</div>
			<div class='arrowDiv'></div>
		</div>
	</a>
	<div class=space></div>`

	const makePlayers = () => {
		const players = [
			{
				id: 1,
				text: '<p>1. FCPX <span>- Introduction &amp; First Steps</span></p>',
			},
			{
				id: 2,
				text: '<p>2. FCPX <span>- Presets and Parameters',
			},
			{
				id: 3,
				text: '<p>3. FCPX <span>- Parameters and Custom Flares',
			},
			{
				id: 4,
				text: '<p>4. FCPX <span>- Tracking Flares with mocha',
			},
			{
				id: 5,
				text: '<p>5. FCPX <span>- Advanced Animation &amp; Effects',
			},
			{
				id: 6,
				text: '<p>6. Motion 5 <span>- Using Motion &amp; Lights',
			},
		]

		return players.map((entry) => playerTemplate(entry.id, entry.text)).join("");
	}


	//tu zmieniamy wysokosc jak jest wiecej niz 1 rzad tutoriali
	var tuts=`
	<div class='tuts' style='height:100%;padding-bottom:4%'>
		<div class='watch section__title'>
			LEARN HOW TO USE IT
		</div>
		${makePlayers()}
		<div id='vimeo' class='vimeoWrapper' onclick='onClickVimeoOff();'>
			<div class='innerWrapper'>
				<iframe allowfullscreen='' frameborder='0' width='958' height='538' mozallowfullscreen='' src='//player.vimeo.com/video/151515697?title=0&amp;byline=0&amp;portrait=0' webkitallowfullscreen=''></iframe>
				<a  role='button' onclick='onClickVimeoOff();'>
					<img src='https://s3.motionvfx.com/mvfxpublic/images/mdust/tuts/x.png?1.0.7' alt=''/>
				</a>
			</div>
		</div>
	</div>
	`;

	document.getElementById('tuts_from_script').innerHTML = tuts;
	
	var vimeoTimes 	= getVimeoTimes();
	var picsNames 	= getPicsNames();
	const formatPicsName = (picName, joinValue) => picName.split(".").join(joinValue + '.');
	var i;
	const fileVersion = "?v=1"
	const mediaUrl = "https://s3.motionvfx.com/mvfxpublic/products/templates/200/media"
	for(i=1;i<=vimeoTimes.length;i++) {
		document.getElementById("time" + i).innerHTML = vimeoTimes[i-1];
		const tut = document.getElementById("tut" + i);
		const sizes = [250, 500, 1000];
		tut.src = `${mediaUrl}/tut_${formatPicsName(picsNames[i-1], "-250")}${fileVersion}`;
		tut.srcset = `
			${sizes.map((size) => {
				return `${mediaUrl}/tut_${formatPicsName(picsNames[i-1], "-" + size)}${fileVersion} ${size}w`
			}).join(',')}
		`;
		
	}
}


window.onload = function() {
	// document.getElementById("regularPrice").innerHTML = "$149";
	
	setTrailerSize();

	$("#presetsDiv").mCustomScrollbar();
	$('#mFlare2page').css({ 'opacity' : 1 });
	$('#mFlare2loading').css({ 'opacity' : 0 });
	
	setDots();
};

function getVimeoTimes() {
	return [ "09:33", "08:54", "11:46", "08:07", "17:07", "17:56" ];
}

function getVimeoNums() {

    //return [ 235296955, 235296937, 235296908, 235296879, 235296819, 235296786 ];
    return [ 'nCwo8oYrZVs', 'UBCcbPnNy8I', 'lSqkZwgbXoo', '-GkypAQy7MM', 'XjS09ArSe5w', 'ZJUUzsVSZl8' ];
}

function getPicsNames() {
	return [ "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg" ];
}

function onHover(num) {
	const tut = document.getElementById("tut" + num)
	if (tut) {
		tut.style.opacity = 1.0;
	}
	const arrow = document.getElementById("arrow" + num)
	if (arrow) {
		arrow.style.opacity = 1.0;
	}
}

function offHover(num) {
	const tut = document.getElementById("tut" + num)
	if (tut) {
		tut.style.opacity = 0.8;
	}
	const arrow = document.getElementById("arrow" + num)
	if (arrow) {
		arrow.style.opacity = 0.2;
	}
}

function onClickVimeoOn(num)  {
	var vimeoNum = getVimeoNums();

	var html = "";
	html += '<div id="videoInner" class="innerWrapper">';
	html +=		'<iframe allowfullscreen="" frameborder="0" width="1916" height="1076" mozallowfullscreen="" src="https://www.youtube.com/embed/' + vimeoNum[num-1] + '?rel=0" webkitallowfullscreen=""></iframe>';
	html +=		'<a onclick="onClickVimeoOff();">';
	html +=			'<img src="https://s3.motionvfx.com/mvfxpublic/images/mdust/tuts/x.png" />';
	html +=		'</a>';
	html += '</div>';

	document.getElementById("vimeo").innerHTML = html;
	document.getElementById("vimeo").style.display = 'flex';
	// document.getElementById("vimeo").style.position = 'fixed';
	// document.getElementById("videoInner").style.position = 'fixed'; 
    // document.getElementById("videoInner").style.top ='34%';
    // document.getElementById("videoInner").style.transform = 'translate(0px, -50%)';
    document.getElementById("topNav2").style.pointerEvents = "none";
}

function onClickVimeoOff()  {
	document.getElementById("vimeo").style.display = 'none';
	document.getElementById("vimeo").innerHTML = '';
	document.getElementById("topNav2").style.pointerEvents = "auto";
}

function setTrailerSize() {
	var vimeoId = document.getElementById("trailerDiv");
	var vimeoVidId = document.getElementById("trailerVid");
	
	if(window.innerWidth<1920) {
    	// vimeoVidId.width = 1100;
		// vimeoVidId.height = 470;
		// vimeoId.style.width = "1100px";
		// vimeoId.style.marginLeft = "-550px";
		// vimeoId.style.marginTop = "-180px";
    }
    else {
		// vimeoVidId.width = 1500;
		// vimeoVidId.height = 642;
		// vimeoId.style.width = "1500px";
		// vimeoId.style.marginLeft = "-750px";
		// vimeoId.style.marginTop = "-280px";
    }
}
		
window.onhashchange = function() {
	setDots();
	darkenHandle();
	
	//document.getElementById("regularPrice").innerHTML = "$149";
}

window.onresize = function() {
	setTrailerSize();
}

// window.addEventListener('resize', function(event){
//   // do stuff here
// });

function setCanScroll(canScroll) {
	document.getElementById("canScroll").innerHTML = canScroll;
}

function getUrlName() {
	var url = window.location.href;
    var name = url.split('#'); //section
    
    if (typeof name[1] != "undefined") {
        name = name[1].split('/'); //slide
        name = name[0];
    }
    else {
        name = "";
    }

	return name;
}

function getUrlSlide() {
	var url = window.location.href;
	var name = url.split('#'); //section
	
	var slide = "0";
	
    if (typeof name[1] != "undefined") {
        if(name[1].indexOf("/") !=-1) {
    	    slide = name[1].split('/');
		    slide = slide[1];
	    }
    }
	
	return slide;
}

function setDots() {
	var name = getUrlName();
	var slide = getUrlSlide();
	var num = getNumForName(name);
	
	for(i=1;i<=sectionCount;i++) {
		if(i==num) {
			currentChecked = num;
			currentCheckedSlide = num + "" + slide;
			highlightSection(1, i);
			highlightSection(1, i + slide);
			if(slide==0) {
				highlightSection(0, i + "1");
			}
			else {
				highlightSection(0, i + "0");
			}
		}
		else {
			highlightSection(0, i);
		}
	}
    
    var topNav = document.getElementById("topNav");
	var sideNav = document.getElementById("nav");

	//hide dots for the first page and show top menu
	if(num==1) {
		// document.getElementById("buyNowFrame").style.pointerEvents = "none";
		document.getElementById("section0").style.opacity = "1";
		
		setTimeout(function() {
			// var nameCurrent = getUrlName();
			// var numCurrent = getNumForName(nameCurrent);

			topNav.classList.remove('active');
			sideNav.classList.remove('active');
		
			//check if we on section num 1 after delay
			// if(numCurrent==1) {
			// 	// document.getElementById("nav").style.pointerEvents = "none";
			// 	// document.getElementById("nav").style.opacity = "0";
			// 	// document.getElementById("logoSmall").style.opacity = "0";
                
            //     // navBuyNow.classList.remove('buy2');
            //     // navBuyNow.classList.add('buy');
            //     // navBuyNow.style.pointerEvents = "auto";
			// }
		}, 750);
	}
	else {
		// document.getElementById("nav").style.pointerEvents = "auto";
		// document.getElementById("buyNowFrame").style.pointerEvents = "auto";

		topNav.classList.add('active');
		sideNav.classList.add('active');
		
		setTimeout(function() {
			// document.getElementById("nav").style.opacity = "1";
			// document.getElementById("logoSmall").style.opacity = "1";
            
            // navBuyNow.classList.remove('buy');
            // navBuyNow.classList.add('buy2');
			// navBuyNow.style.pointerEvents = "auto";
            
			var nameCurrent = getUrlName();
			var numCurrent = getNumForName(nameCurrent);
		
			//check if we on section num 1 after delay
			if(numCurrent!=1) {
				// document.getElementById("section0").style.opacity = "0";
			}
 		}, 750);
		
		if(num==5) {
			document.getElementById("divUI").style.transform = "translateY(0)";
		}
		else {
			document.getElementById("divUI").style.transform = "translateY(75px)";
		}
		
		if(num==7) {
			document.getElementById("divColorPalette").style.transform = "translateY(0)";
		}
		else {
			document.getElementById("divColorPalette").style.transform = "translateY(75px)";
		}
		
		if(num==8) {
			setTimeout(function() { 
				document.getElementById("textureBg").style.opacity = "1";
 			}, 500);
		}
		else {
			document.getElementById("textureBg").style.opacity = "0";
		}
		
		if(num==11) {
			setTimeout(function() { 
				document.getElementById("sec10").style.opacity = "1";
 			}, 1000);
		}
		else {		
			document.getElementById("sec10").style.opacity = "0";
		}
	}
}

function darkenHandle() {
	var url = window.location.href;
	var name = url.split('#');
	name = name[1];
	
	//characteristics
	if(name===sections[3]) {
		document.getElementById("darken1").style.opacity = 0;
		document.getElementById("sec3b").style.opacity = 0;
		setTimeout(function() {
			document.getElementById("sec3").style.opacity = 1;
 		}, 200);
	}
	else if(name===(sections[3] + "/1")) {
		document.getElementById("darken1").style.opacity = 0.6;
		document.getElementById("sec3").style.opacity = 0;
		setTimeout(function() {
			document.getElementById("sec3b").style.opacity = 1;
 		}, 200);
	}
	//tracking
	else if(name===sections[9]) {
		document.getElementById("darken2").style.opacity = 0;
		document.getElementById("sec9b").style.opacity = 0;
		setTimeout(function() {
			document.getElementById("sec9").style.opacity = 1;
 		}, 200);
	}
	else if(name===(sections[9] + "/1")) {
		document.getElementById("darken2").style.opacity = 0.6;
		document.getElementById("sec9").style.opacity = 0;
		setTimeout(function() {
			document.getElementById("sec9b").style.opacity = 1;
 		}, 200);
	}
}

function highlightSection(on, num) {
	var transform, background;
	if(on) {
		transform = "scale(0.9)";
		background = "#fff none repeat scroll 0 0";
	}
	else {
		transform = "scale(0.42)";
		background = "#777 none repeat scroll 0 0";
	}
	
	var spanId = document.getElementById("span" + num);
	if(spanId) {
		spanId.style.transform = transform;
		spanId.style.background = background;
	}
}

function hoverOnDots(hoverOn, num) {
	var pId = document.getElementById("p" + num);
	var spanId = document.getElementById("span" + num);

	var pOpacity = hoverOn;

	if(pId) {
		pId.style.opacity = pOpacity;
	}

	if(currentChecked!=num && currentCheckedSlide!=num) {
		highlightSection(hoverOn, num);
	}
}

function getNumForName(name) {
	var num = 1;

	for(i=0;i<sectionCount;i++) {
		if(sections[i]===name) {
			num = i+1;
			break;
		}
	}
	
	return num;
}

function getSiteURL() {
	var url = window.location.href;
	var urlSplit = url.split('#');
	return urlSplit[0];
}

function setActiveSection(num, slide) {
	highlightSection(1, num);
	highlightSection(1, num + "" + slide);
	
	if(slide==0) {
		highlightSection(0, num + "1");
	}
	else {
		highlightSection(0, num + "0");
	}
	
	currentChecked = num;
	currentCheckedSlide = num + "" + slide;
	 
	for(i=1;i<=sectionCount;i++) {
		if(i!=num) {
			highlightSection(0, i);
		}
	}
	
	window.location = getSiteURL() + "#" + document.getElementById("p" + num).innerHTML.toLowerCase() + "/" + slide;
}

function mobileAndTabletcheck() {
  	var check = false;
  	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  	return check;
}
	
function checkMobile() {
	if(!mobileAndTabletcheck()) {
		// var videoId1, videoId2, bgImg1, bgImg2;
			
		// videoId1 = document.getElementById("video1");
		// videoId2 = document.getElementById("video2");
		// bgImg1 = document.getElementById("section3");
		// bgImg2 = document.getElementById("section10");
		
		// videoId1.style.display = 'block';
		// videoId2.style.display = 'block';
		
		// videoId1.play();
		// videoId2.play();
			
		// bgImg1.style.backgroundImage = '';
		// bgImg2.style.backgroundImage = '';
	}
	else {
		// var wide1, wide2, videoId1, videoId2;
			
		// wide1 = document.getElementById("widescreen1");
		// wide2 = document.getElementById("widescreen2");
	
		// wide1.style.display = 'none';
		// wide2.style.display = 'none';
		
		// videoId1 = document.getElementById("video1");
		// videoId2 = document.getElementById("video2");
		
		// videoId1.style.display = 'none';
		// videoId2.style.display = 'none';
	}
}

function checkAnchorRedirects() {
    if(getUrlName()==="tutorial") {
        window.location = getSiteURL() + "#tutorials";
    }
    if(getUrlName()==="specs") {
        window.location = getSiteURL() + "#specification";
    }
}

checkAnchorRedirects();
// checkMobile();