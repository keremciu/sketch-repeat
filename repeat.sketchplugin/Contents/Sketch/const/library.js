//
//  library.js
//
//  Created by Kerem Sevencan
//  Copyright (c) 2016. All rights reserved.
//

var Library = {
  "scaleLayerToSize": function (layer,width,height,round) {

		if (round==undefined) round = true;

		if (round) {
			width = Math.round(width)
			height = Math.round(height)
		}

		var locked = layer.isLocked()
		if (locked) layer.setIsLocked(false)

		frame = layer.frame()

		oldWidth      = frame.width()
		oldHeight     = frame.height()
		proportion    = width/oldWidth
		hProportion   = height/oldHeight

		if (proportion == hProportion) {
      var midX    = layer.frame().midX()
      var midY    = layer.frame().midY()

			layer.multiplyBy(proportion);

			// Translate frame to the original center point.
			layer.frame().midX = midX;
			layer.frame().midY = midY;
			return
		}

    // calculate borders
    borders = layer.style().borders().array()
		for (var b = 0; b < borders.count(); b++) {
      border = borders.objectAtIndex(b)
      var thickness = border.thickness()

      if (thickness!=undefined) {
        thickness = thickness * proportion
        border.setThickness(thickness)
      }
    }

    // calculate shadows
		shadows = layer.style().shadows().array()
		for (var w=0; w < shadows.count(); w++) {
      shadow = shadows.objectAtIndex(w)

			var offsetX = shadow.offsetX()
			offsetX = offsetX * proportion
			shadow.setOffsetX(offsetX)

			var offsetY = shadow.offsetY()
			offsetY = offsetY * proportion
			shadow.setOffsetY(offsetY)

			var blurRadius = shadow.blurRadius()
			blurRadius = blurRadius * proportion
			shadow.setBlurRadius(blurRadius)

			var spread = shadow.spread()
			spread = spread * proportion
			shadow.setSpread(spread)
		}

    // calculate inner shadows
    innerShadows = layer.style().innerShadows().array()
		for (var w = 0; w < innerShadows.count(); w++) {
      innerShadow = innerShadows.objectAtIndex(w)

			var offsetX = innerShadow.offsetX()
			offsetX = offsetX * proportion
			innerShadow.setOffsetX(offsetX)

			var offsetY = innerShadow.offsetY()
			offsetY = offsetY * proportion
			innerShadow.setOffsetY(offsetY)

			var blurRadius = innerShadow.blurRadius()
			blurRadius = blurRadius * proportion
			innerShadow.setBlurRadius(blurRadius)

			var spread = innerShadow.spread()
			spread = spread * proportion
			innerShadow.setSpread(spread)
		}

    frame.setWidth(Math.round(width))
    frame.setHeight(Math.round(height))

    layer.setIsLocked(locked)
	}
};
