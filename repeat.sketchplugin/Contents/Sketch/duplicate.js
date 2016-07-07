@import "const/library.js"

var onRun = function(context) {

  // 1. Get selected layer
  var plugin        = context.plugin
  var doc           = context.document
  var selection     = context.selection

  // 2. Check selected layer - is it empty?
  if (!selection && selection.count()<=0) {
    // Show an error when user did not select a layer.
    doc.showMessage('Nothing selected, please select an object.')
  } else {
    // 3. Check selected layer in an artboard?
    var page              = doc.currentPage()
    var currentArtboard   = page.currentArtboard()

    if (!currentArtboard) {
      doc.showMessage('Selection is not inside an artboard.')
	  } else {
      var frame           = currentArtboard.frame()

      artboards = page.artboards()
      for (i = 0; i < artboards.count(); i++) {
			  artboard = artboards[i];

        if (artboard == currentArtboard) continue

        artboardFrame = [artboard frame]

        // Use the width difference to scale
			  proportion = artboardFrame.width() / frame.width()
        for (var j=0; j < selection.count(); j++) {
				  layer = selection[j]
          layerCopy = layer.duplicate()
          newProportion = proportion

          var locked = layerCopy.isLocked()
				  if (locked) [layerCopy setIsLocked:false]

          currentArtboard.removeLayer(layerCopy)
          artboard.addLayers([layerCopy])

          copyFrame = layerCopy.frame()

          height = (frame.height() * newProportion)
          // If using the width the layer will be too big (changes in proportion between artboards), then the height will be used to calculate the proportion
  				if (height>artboardFrame.height() && copyFrame.height()<=frame.height()) {
  					newProportion = artboardFrame.height() / copyFrame.height()
  				}

          x = (copyFrame.x() * newProportion)
  				y = (copyFrame.y() * newProportion)
  				width = (copyFrame.width() * newProportion)
  				height = (copyFrame.height() * newProportion)

  				// Scale layer including borders, shadows and inner shadows
  				Library.scaleLayerToSize(layerCopy, width, height, true)

  				[copyFrame setX:Math.round(x)];
  				[copyFrame setY:Math.round(y)];

  				layerCopy.setIsLocked(locked)
        }
      }
    }
  }
}
