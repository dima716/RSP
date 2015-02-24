RSP = function(){
var dndSupported, // true if drag and drop supported
    eventCounter = 1,
    sourceId,
    payloads = {
      img1: "I am Rock",
      img2: "I am Paper",
      img3: "I am Scissors"
    }

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

function handleDragStart(event) {
  sourceId = this.id;
  statusMessage("Drag started: (" + payloads[sourceId] + ")");
}

function handleDragEvent(event) {
  if(event.preventDefault) event.preventDefault();
  statusMessage("Received drop: (" + payloads[sourceId] + ")");
}


function handleDragOver(event) {
  if(event.preventDefault) event.preventDefault();
  return false;
}

function setUpListeners() {
  element("img1").addEventListener("dragstart", handleDragStart, false);
  element("img2").addEventListener("dragstart", handleDragStart, false);
  element("img3").addEventListener("dragstart", handleDragStart, false);
  element("dz1").addEventListener("dragover", handleDragOver, false);
  element("dz1").addEventListener("drop", handleDragEvent, false);
}


return {
  init: function() {
    if (dndSupported = detectDragAndDrop()) {
      statusMessage("Using HTML5 DragAndDrop");
      setUpListeners();
    } else {
      statusMessage("This browser doesn't support Drag and Drop");
    }
  }
}

}()

RSP.init();
