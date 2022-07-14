function getTranslateName(trShort) {
    var translateName = "translateX";
  
    if (trShort === "undefined" || trShort === "none") {
      trShort = trShort.toUpperCase();
    }
  
    if (trShort === "Y") {
      translateName = "translateY";
    }
  
    return translateName;
  }
  
  function setModifierAndPosition(element, percent) {
    var mscrollInside = element.getElementsByClassName("mscrollInside");
  
    for (var i = 0; i < mscrollInside.length; i++) {
      var trShort = mscrollInside[i].dataset.axis;
      var translate = mscrollInside[i].dataset.move;
  
      var translateName = getTranslateName(trShort);
  
      var start = translate*percent/100.;
  
      mscrollInside[i].style.transform = translateName + "(" + start + "px)";
    }
  }
  
  function changePosition() {
    var mscroll = document.getElementsByClassName("mscroll");
  
    for (var i = 0; i < mscroll.length; i++) {
      var screenTop = document.documentElement.scrollTop;
      //safari fix
      if (screenTop == 0) {
        screenTop = document.body.scrollTop;
      }
      var screenBottom = screenTop + mscroll[i].offsetHeight;
      var boxTop = mscroll[i].offsetTop;
  
      var boxHeight = mscroll[i].offsetHeight;
      var percent = (screenBottom - boxTop) / boxHeight * 100;
      if (percent > 0) {
        if (percent > 70) {
          percent = percent - 70;
          setModifierAndPosition(mscroll[i], percent);
        }
      }
    }
  }
  
  function settingsOnStart() {
    var mscrollInside = document.getElementsByClassName("mscrollInside");
  
    for (var i = 0; i < mscrollInside.length; i++) {
      mscrollInside[i].style.transition =
        "transform " + mscrollInside[i].dataset.time + "s ease-out, opacity 0.7s ease-out";
    }
  }
  
  $(document).ready(function() {
    settingsOnStart();
  
    $(document).scroll(function() {
      changePosition();
    });
  });
  