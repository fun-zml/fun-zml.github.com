// blowup.js
// Paul Krishnamurthy 2016
//<!DOCTYPE html5> DOCTYPE一定要用html5！  

$(function ($) {

  $.fn.blowup = function (attributes,brother) {

    var $element = this;
    var $className = $element.attr("class");
   	var $class1,$brother
    // If the target element is not an image
    if (!$element.is("img")) {
      console.log("%c Blowup.js Error: " + "%cTarget element is not an image.", 
        "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;",
        "background: #FCEBB6; color: #F07818; font-size: 17px;");
      return;
    }

    // Constants
    var $IMAGE_URL    = $element.attr("src");
    var $IMAGE_WIDTH  = $element.width();
    var $IMAGE_HEIGHT = $element.height();
    var NATIVE_IMG    = new Image();
    NATIVE_IMG.src    = $element.attr("src");

    // Default attributes
    var defaults = {
      round      : true,
      width      : 200,
      height     : 200,
      background : "#FFF",
      shadow     : "0 8px 17px 0 rgba(0, 0, 0, 0.2)",
      border     : "6px solid #FFF",
      cursor     : true,
      zIndex     : 999999
    }

    // Update defaults with custom attributes
    var $options = $.extend(defaults, attributes);

    // Modify target image
    $element.on('dragstart', function (e) { e.preventDefault(); });
    $element.css("cursor", $options.cursor ? "crosshair" : "none");

    // Create magnification lens element
    var lens = document.createElement("div");
    lens.id = ""+$className+"BlowupLens";

    // Attack the element to the body
    $("body").append(lens);

    // Updates styles
    $blowupLens = $("#"+$className+"BlowupLens");

    $blowupLens.css({
      "position"          : "absolute",
      "visibility"        : "hidden",
      "pointer-events"    : "none",
      "zIndex"            : $options.zIndex,
      "width"             : $options.width,
      "height"            : $options.height,
      "border"            : $options.border,
      "background"        : $options.background,
      "border-radius"     : $options.round ? "50%" : "none",
      "box-shadow"        : $options.shadow,
      "background-repeat" : "no-repeat",
    });

    // Show magnification lens
    $element.mouseenter(function () {
    	$class1 = $element.attr("class");
    	$blowupLens = $("#"+$class1+"BlowupLens");
      $blowupLens.css("visibility", "visible");
      $brother = $("#"+brother+"BlowupLens");
      $brother.css("visibility", "visible");
    })

    // Mouse motion on image
    $element.mousemove(function (e) {
    	/*$blowupLens = $("#"+$class1+"BlowupLens");
    	$brother = $("#"+brother+"BlowupLens");*/
      // Lens position coordinates
      var lensX = e.pageX - $options.width / 2;
      var lensY = e.pageY - $options.height / 2;

      // Relative coordinates of image
      var relX = e.offsetX;
      var relY = e.offsetY;
     
      // Zoomed image coordinates 
      var zoomX = -Math.floor(relX / $element.width() * NATIVE_IMG.width - $options.width / 2);
      var zoomY = -Math.floor(relY / $element.height() * NATIVE_IMG.height - $options.height / 2);

      // Apply styles to lens
      $blowupLens.css({
        left                  : lensX,
        top                   : lensY,
        "background-image"    : "url(" + $IMAGE_URL + ")",
        "background-position" : zoomX + " " + zoomY
      });
      
      if(brother == "demo2"){
      	$brother.css({
	        left                  : lensX + $element.parent().width(),
	        top                   : lensY,
	        "background-image"    : "url(" + $IMAGE_URL + ")",
	        "background-position" : zoomX + " " + zoomY
	      });
      }else if(brother == "demo1"){
      	$brother.css({
	        left                  : lensX - $element.parent().width(),
	        top                   : lensY,
	        "background-image"    : "url(" + $IMAGE_URL + ")",
	        "background-position" : zoomX + " " + zoomY
	      });
      }
      

    })

    // Hide magnification lens
    $element.mouseleave(function () {
    	/*$blowupLens = $("#"+$class1+"BlowupLens");*/
      $blowupLens.css("visibility", "hidden");
      /*$brother = $("#"+brother+"BlowupLens");*/
      $brother.css("visibility", "hidden");
    })

  }
})
