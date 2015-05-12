# Evaluation of SVG Detail:
---

## Tools:
*  [Peter Collingridge's SVG Editor:](http://petercollingridge.appspot.com/svg-editor)
  *  Pros:
      *  Awesome GUI, so you can see the effects the optimizations have on the SVG elements.
      *  Great at learning what happens to SVG, since you can see the code as it is altered.
  *  Cons:
      *  Can only optimize one SVG at a time.
      *  External site, so if you don't like depending on someone else for workflow, that could be a problem.
*  [SVGO](https://github.com/svg/svgo)
  *  Pros:
      *  Flexible Workflow, can use the GUI, command-line, as part of a task runner like Grunt or Gulp, even as a folder command in OSX.
      *  Is a package in NPM, so you host the tool locally for your site.
  *  Cons:
      *  Can be less exact and break SVG due to not seeing the effects of the optimizations in real time.

## Styling SVG

#### All inside an SVG file (adi.svg):

  *  Presentation Attributes:
    *  SVG 1.1 didn't require CSS as all the styles were given via presentation attributes
```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300px" height="300px" viewBox="0 0 300 300">
  <polygon
    fill = "#FF931E"
    stroke = "#ED1C24"
    stroke-width = "5"

    points = "908.1, 906.6..."/>
</svg>

```

*  Presentation Attributes VS CSS Attributes:
      *  Some are shared, but many are not in SVG 1.1.  [W3C Presentation Spec](http://www.w3.org/TR/SVG/propidx.html)
      *  More (much more) are coming in SVG 2.0. [W3C List](http://www.w3.org/TR/SVG2/styling.html#SVGStylingProperties)
      *  ![CSS vs SVG style properties](/img/shared-properties.png)
*  Inline Styles:
      *   Can also apply styles we know and love to SVG inline:

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 300px; height: 300px;" viewBox="0 0 300 300">
<polygon
  style = "fill: #FF931E; stroke: #ED1C24; stroke-width: 5;"
  points = "279.1,160.8 195.2,193.3 174.4,280.8   117.6,211.1 27.9,218.3 76.7,142.7 42.1,59.6 129.1,82.7 197.4,24.1 202.3,114 "/>
</svg>
```

*  Embedded Styles:
    *   Can also reference the CSS in an Embedded Style Sheet

```
<style type="text/css">
  /* style rules */
</style>
```

*  External Stylesheets:
    *   Can reference via an xml-stylesheet tag:

```
<?xml-stylesheet type="text/css" href="style.css"?>
```

*  Style Cascade overrides
  *   All presentation attributes will be overridden by document styles. The only style that presentation attributes actually overwrite are user agent stylesheets (default browser).
  *  ![The SVG Style Cascade](/img/style-cascade.png)


#### Using CSS Selectors:

*  Most CSS selectors can be used to style SVG:
    *  classes
    *  IDs
    *  pseudo classes
*  Relevant CSS styles will work on SVG elements:
    *  fill
    *  stroke
    *  stroke-width
    *  transition
    *  ...just to name a few

## SVG Spriting:

*  First, creating the individual assets is necessary.
    *  Understanding the usage of ``<g>``, ``<use>``, ``<defs>``, &amp; ``<symbol>`` is important to knowing how sprites will interact.
    *  Only use as much artboard pixels as is necessary to render the image, this reduces the number of integers in the ``<path>``.
*  Then manually create the sprite sheet with the icons, making sure to leave some space between them for padding.
*  Using the ``viewBox``, highlight only the areas of the individual sprite.
*  Use the co-ordinates that were defined above, create a ``<view>`` element to reference the ``viewBox``:
    *  ``<view id="svg-sprite-icon" viewBox="64 0 32 32" />``
*  This "view" can now be used as a anchor inside any SVG embedding technique, even using ``<img>`` tags to leverage browser caching.
    *  Like so: ``<img src="svg-sprite.svg#svg-sprite-icon" alt="One Sprite" />``
*  There are **TONS OF OTHER TECHNIQUES**, view some [here](http://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/).

## Animating SVG with CSS:

*  SVG doesn't have box-model, so you are actually transforming from the transform-origin:

| &nbsp; | transform-origin (default) |
| --- | --- |
| HTML Elements (div, ::before, etc...) | 50% 50% <br> (the center of the element, relative to its' box-model) |
| SVG Elements (circle, rect, etc...) | 0 0 <br> (the top left corner of the SVG canvas, the viewBox) |

*  Example:

```
<div style="width: 100px; height: 100px; background-color: #FF0000;"></div>
<svg style="width: 150px; height: 150px; background-color: #FFFF00;">
  <rect width="100" height="100" x="25" y="25" fill="#FFFF00" />
</svg>
```

*  Use absolute values to set the transform-origin for cross browser compatibility.
*  Example:
    *  [Pinwheel](http://codepen.io/SaraSoueidan/pen/d0f94390e6c9af38fa562974399b6222)

*  Any of the properties shared with CSS can be animated, but things like SVG ``<path>`` cannot be animated via CSS.


## Animating SVG with JS:

*  Animating on a path using SMIL
*  [Snap.svg](http://www.snapsvg.io) <- the Jquery of SVG.
*  Animating a signature :)
    *  Both CSS &amp; JS will be used.

# Presentation TO DO :

- [x] Initial HTML page for basic show/tell of .SVG files created to show styling
- [x] SVG Creation:
  - [x] Basic ``<g>`` SVG
  - [ ] SVG Sprite Sheet Art Creation
- [x] Main HTML page for interactive elements
  - [x] CSS Animations
  - [ ] JS Animations
