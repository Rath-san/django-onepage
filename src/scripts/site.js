
var sectionPresetsAction = 0;
var UIButtonsCount = 11;
var currentActiveNum = 0;
var sectionCount = 14;
var previousName = "";
var presetsTimer = 4000;
var sections = ['intro', 'trailer', 'overview', 'beforeafter', 'interface', 'osc', 'presets', 'tutorials', 'specification', 'experience'];

const lazyLoadImages = (images = []) => {

		const setupImage = (image) => image.dataset.loaded = false;
		const showImage = (image) => image.dataset.loaded = true;

		images.forEach((img) => {
				setupImage(img)
				if (img.complete && !img.dataset.src) {
					showImage(img);
					return;
				}

				img.onload = () => {
					showImage(img);
				}

		})
}

const sectionImages = Array.from(document.querySelectorAll('.section img'))
sectionImages.shift()
lazyLoadImages(sectionImages)

const onLoad = () => {
    $('#menuTop').css({ 'opacity' : 1 });
    $('#fp-nav').css({ 'opacity' : 1 });


	const sections = Array.from(document.querySelectorAll('.section'))
	sections.shift()
	sections.forEach(s => {
		const video = s.querySelector('video')
		if (video) {
			// if (video.HAVE_FUTURE_DATA) {
			// 	s.classList.add('video-ready')
			// }

			video.oncanplay = () => {
				s.classList.add('video-ready')
			}
		}
	});
}




const preloadPresets = () => {
	const presetIndex = sections.findIndex(e => e === 'presets');
	const presetSectionId = $(`#section${presetIndex}`);

	const presetImages = presetSectionId.find('img');
	// $.each(presetImages, function() {
	// 	$(this).css('opacity', 0);
	// 	this.onload = () => {
	// 		$(this).css('opacity', '');
	// 	};
	// });
}

window.onload = function() {
    $('#fullpage').fullpage({
        navigation: true,
		// onLeave: (origin, destination, direction) => {
		// 	$(`#section${destination}`).addClass('lazy-loaded');
		// },
        navigationPosition: 'right',
        navigationTooltips: ['Intro', 'Trailer', 'Overview', 'Before-After', 'Interface', 'Osc', 'Presets', 'Tutorials', 'Specification', 'Experience'],
        anchors: sections,
        slidesNavigation: true,
		normalScrollElements: '.yt-menu'
    });

	onLoad();

    setImagesOnStart();
	setAnimations();

	preloadPresets();
}

window.onhashchange = function() {
	setAnimations();
}

function getNumForName(name) {
	var num = 1;

	for(let i=0;i<sectionCount;i++) {
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

function changeOpacity(selector, numCurrent, numActivate) {
	var elements = Array.from(document.querySelectorAll(selector));
	if(elements.length) {
		if(numCurrent==numActivate) {
			elements.forEach(element => {
				element.style.transition = "opacity 2s ease-in-out";
				element.style.transitionDelay = "200ms";
				element.style.opacity = "1";
			});
		}
		else {
			elements.forEach(element => {
				element.style.transition = "opacity 1.5s ease-in-out";
				element.style.transitionDelay = "unset";
				element.style.opacity = "0";
			});
		}
	}
}

function setAnimations() {
	var name = getUrlName();
	var num = getNumForName(name);
	var slide = getUrlSlide();

		var idBlurOSC = document.getElementById("idBlurOSC");
		if(idBlurOSC) {
			if(num==6) {
				idBlurOSC.style.transition = "transform 2s ease-in-out";
				idBlurOSC.style.transitionDelay = "200ms";
				idBlurOSC.style.transform = "translateY(0%)";
			}
			else {
				idBlurOSC.style.transition = "transform 750ms ease-in-out";
				idBlurOSC.style.transitionDelay = "unset";
				idBlurOSC.style.transform = "translateY(15%)";
			}
		}

		changeOpacity(".idTrailer", num, 2);
		changeOpacity("#idOverview1", num, 3);
		changeOpacity("#idOverview2", num, 3);
		changeOpacity("#idBeforeAfter", num, 4);

		if(num==7 && sectionPresetsAction==0) {
			sectionPresetsAction = 1;
			var slideNum = 0;
            
			setTimeout(function() {
				var name = getUrlName();
				var num = getNumForName(name);
				
				if(num==7) {
					if(slideNum==0) slideNum = 1;
					else if(slideNum==1) slideNum = 0;

					window.location = getSiteURL() + "#" + sections[6] + "/" + slideNum;
				}
			}, presetsTimer);
		}

		//Interface
		if(num==5) {
			if(name!=previousName) {
				previousName = name;
				setActiveUI(slide, false);
			}
		}
}

window.hoverOnUI = function hoverOnUI(num, isOn) {
	var element = document.getElementById("idUI" + num);

	if(element) {
		var bg = element.style.backgroundImage;

		if(isOn==1 && num!=currentActiveNum) {
			bg = bg.replace("_active.png", ".png");
			bg = bg.replace("_hover.png", ".png");
			bg = bg.replace(".png", "_hover.png");
		}
		else if(num>currentActiveNum) {
			bg = bg.replace("_active.png", ".png");
			bg = bg.replace("_hover.png", ".png");
		}

		element.style.backgroundImage = bg;
	}
}

//inline set background-image
window.setActiveUI = function setActiveUI(num, goToLoaction=true) {
	var setRaw = 0;

	if(num==currentActiveNum) {
		currentActiveNum = 0;
		setRaw = 1;
	}

	for(let i=1;i<=UIButtonsCount;i++) {
		var element = document.getElementById("idUI" + i);

		if(element) {
			var bg = element.style.backgroundImage;

			if(i<=num && setRaw==0) {
				bg = bg.replace("_active.png", ".png");
				bg = bg.replace("_hover.png", ".png");

				if(i==num) {
					currentActiveNum = num;
					bg = bg.replace(".png", "_active.png");
				}
				else {
					bg = bg.replace(".png", "_hover.png");
				}
			}
			else {
				bg = bg.replace("_hover.png", ".png");
				bg = bg.replace("_active.png", ".png");
			}

			element.style.backgroundImage = bg;
		}
	}

	if(goToLoaction) {
		window.location = getSiteURL() + "#" + sections[4] + "/" + (setRaw==1 ? "0" : num);
	}
}

function setImagesOnStart() {
	$(".mFilmLookTuts").ycp();

	for(let i=1;i<=UIButtonsCount;i++) {
		var element = document.getElementById("idUI" + i);

		if(element) {
			switch (i) {
				case 1:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/pipeta.png')"; break;
				case 2:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/levels.png')"; break;
				case 3:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/adjust.png')"; break;
				case 4:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/flare.png')"; break;
				case 5:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/lut.png')"; break;
				case 6:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/aberration.png')"; break;
				case 7:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/distortion.png')"; break;
				case 8:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/blur.png')"; break;
				case 9:  element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/grain.png')"; break;
				case 10: element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/vignette.png')"; break;
				case 11: element.style.backgroundImage = "url('https://s3.motionvfx.com/mvfxpublic/products/templates/1143/media/letterbox.png')"; break;
				default: break;
			}
		}
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
