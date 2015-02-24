RSP = function(){

var dndSupported, // true if drag and drop supported
    eventCounter = 1,
    sourceId,
    dndElems = [],
    draggingElement,
    winners = {
      Rock: "Paper",
      Paper: "Scissors",
      Scissors: "Rock"
    };

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

function handleDragStart(e) {
  var rpsType = getRPSType(this);
  draggingElement = this;

  draggingElement.classList.add("moving");
  statusMessage("Drag " + rpsType);
  e.dataTransfer.setDragImage(getRPSImg(draggingElement), 120, 120); // set the drag image
}

function handleDragEnd(e) {
  // reset the element style
  draggingElement.classList.remove("moving");
  draggingElement = null;

  // reset all of of the elements
  for(var i = 0; i < dndElems.length; i++) {
    dndElems[i].classList.remove("hover");
  }
}

function handleDragEnter(e) {
  if (this !== draggingElement) {
    statusMessage("Hover " + getRPSType(draggingElement) + " over " + getRPSType(this));
  } else {
    statusMessage("Drag " + getRPSType(this));
  }
}

function handleDragOver(e) {
  if(e.preventDefault) e.preventDefault();
  this.classList.add("hover");
  return false;
}

function handleDragLeave(e) {
  this.classList.remove("hover");
}

function handleDragDrop(e) {
  if(e.stopPropagation) e.stopPropagation(); // Stops some browsers from redirecting
  if(e.preventDefault) e.preventDefault();

  if(this.id === draggingElement.id) return false;

  indicateWinner(this,draggingElement);
}

function setUpListeners() {
  for(var i = 0; i < dndElems.length; i++) {
    dndElems[i].addEventListener("dragstart", handleDragStart, false);
    dndElems[i].addEventListener("dragend", handleDragEnd, false);
    dndElems[i].addEventListener("dragover", handleDragOver, false);
    dndElems[i].addEventListener("dragenter", handleDragEnter, false);
    dndElems[i].addEventListener("dragleave", handleDragLeave, false);
    dndElems[i].addEventListener("drop", handleDragDrop, false);
  }
}

// Utility methods
function indicateWinner (under, over) {
  var underType = getRPSType(under),
      overType = getRPSType(over);

      if(overType == winners[underType]) {
        statusMessage(overType + " beats " + underType);
        swapRPS(under, over);
      } else {
        statusMessage(overType + " doesn't beat " + underType);
      }
}

function swapRPS(a, b) {
  var temp = {};

  temp.src = getRPSImg(a).src;
  temp.type = getRPSType(a);

  getRPSImg(a).src = getRPSImg(b).src;
  getRPSFigure(a).getElementsByTagName("figcaption")[0].innerHTML = getRPSType(b);

  getRPSImg(b).src = temp.src;
  getRPSFigure(b).getElementsByTagName("figcaption")[0].innerHTML = temp.type;
}

function getRPSFigure(e) {
  var children = e.childNodes;

  for(var i = 0; i < children.length; i++) {
    if(children[i].nodeName.toLowerCase() == "figure") return children[i];
  }
}

function getRPSImg(e) {
  var figure = getRPSFigure(e);
  return figure.getElementsByTagName("img")[0];
}

function getRPSType(e) {
  var figure = getRPSFigure(e);
  return figure.getElementsByTagName("figcaption")[0].innerHTML;
}

return {
  init: function() {
    if (dndSupported = detectDragAndDrop()) {
      statusMessage("Using HTML5 DragAndDrop");
      dndElems.push(element("rps1"), element("rps2"), element("rps3"));
      setUpListeners();
    } else {
      statusMessage("This browser doesn't support Drag and Drop");
    }
  }
}

}()

RSP.init();
