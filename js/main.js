RSP = function(){
  var dndSupported; // true if drag and drop supported

  function detectDragAndDrop() {
    if(navigator.appName == "Microsoft Internet Explorer") {
      var ua = navigator.userAgent;
      re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})=");
      if(re.exec(ua) != null) {
        var rv = parseFloat( RegExp.$1 );
        if(rv >= 6.0) return true;
      }
      return false;

    }
    if ("draggable" in document.createElement("span")) return true;
    return false;
  }

return {
  init: function() {
    if (dndSupported = detectDragAndDrop()) {
      statusMessage("Using HTML5 DragAndDrop");
    } else {
      statusMessage("This browser doesn't support Drag and Drop");
    }
  }
}

}()

RSP.init();
