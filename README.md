# Scroll Swipe Protection
## A JQuery plugin for uninterrupted page scrolling

This plugin generates overlays on iframes and other scrollable sub-containers to prevent swipe- and scroll-blocking of websites.  

Scroll-blocking is a behavior that can occur when scrollable sub-components are used on a website. Common examples would be an iframe, a block element made scrollable via CSS (overflow: scroll / auto) or a JavaScript plugin that generates custom scroll bars.  
Scrolling the page gets interrupted as soon as this sub-component lands under the mouse cursor or a mobile device user swipes over it, at which point the scrolling wheel or swipe gesture will no longer continue scrolling the page but starts interacting with that scrollable sub-component instead. In the case of an embedded Google Map, that used to result in an involuntary zoom-in action on the map (which was actually the main reason behind the development of this plugin), up until mid-2017 when Google began to implement overlays that give users the hint to either pinch to zoom or hold down Ctrl while using the mouse wheel.  
If an affected sub-component stretches across the entire width of the page, the only way to scroll past it would be to use the scroll bar handles, which is extremely annoying for most users. And mobile devices don't even have those, so there the problem is even more severe, as all parts below the sub-component could become complety inaccessible, because the user can never scroll past the element that absorbs all swipe gestures that were actually intended to continue scrolling the page.  

That's where this plugin comes to the rescue by hiding the sub-component behind a protective layer that can be toggled on and off, either via button, a hover-timeout or both. As long as it is active, a mouse wheel action or swipe gesture above the protected elemet will never be interpreted to have occurred inside the sub-component, but above it, so the page continues to scroll without any interruptions.  

## Live-Demo:

[Try it in action here](https://webentwinkler.net/code-projects/javascript/demos/scroll-swipe-protection/demo.html)

## Usage:

This will enable the plugin on all basic Google Maps iframes:
```javascript
  $(document).ready(function(){
    $('iframe[src^="https://www.google.com/maps/embed?"]').scrollSwipeProtection({ createWrapper:true });
  });
```

## Options:

* __createWrapper__  
  __Expects:__ Boolean  
  __Default Value:__ false  
  __Description:__  
  If true, it will create a div around each selected element. If false, each selected element will become a plugin container itself. If the element is an iframe, setting this to true is mandatory or else a lot of the plugin's functionality might not work.  
  
* __createButton__  
  __Expects:__ Boolean  
  __Default Value:__ true  
  __Description:__  
  If true, a button will be created inside each matched element (or inside its wrapper if createWrapper was set to true) that serves both as an indicator whether the blocking functionality is currently active or not as well as a toggle to switch between those states.  
  
* __protectionToggleType__  
  __Expects:__ String  
  __Default Value:__ 'both'  
  __Description:__  
  Passing the value 'scroll' or 'both' will enable the Desktop behavior for the hover timer (but only if the value provided for hoverTimeoutMs is greater than 0). Passing 'touch' or anything else will disable all hover-behavior and enable deactivation of the blocking overlay only via a click or tap on the toggle button.  
  
* __hoverTimeoutMs__  
  __Expects:__ Integer  
  __Default Value:__ 1200  
  __Description:__  
  If the value provided here is greater than 0, it will be interpreted as the waiting time in milliseconds for the cursor to keep hovering over the locked element before it gets unlocked. If it is less than or equal to 0, only a click / tap on the toggle button can unlock the element for interaction.  
  
* __toggleButtonPosition__   
  __Expects:__ String  
  __Default Value:__ 'top-right'  
  __Description:__  
  Determines the position of the toggle button. Possible values are: 'top-right', 'bottom-right', 'top-left' and 'bottom-left'.  
  
* __toggleButtonColor__  
  __Expects:__ String  
  __Default Value:__ '#EEEEEE'  
  __Description:__  
  Determines the background color of the toggle button in its default state. Must be a valid CSS-Value for the "background-color" property.  
  
* __toggleButtonHoverColor__  
  __Expects:__ String  
  __Default Value:__ '#CCCCCC'  
  __Description:__  
  Determines the background color of the toggle button in its hover state. Must be a valid CSS-Value for the "background-color" property.  
  
* __toggleButtonPadding__  
  __Expects:__ String  
  __Default Value:__ '10px 12px'  
  __Description:__  
  Determines the padding of the toggle button. Must be a valid CSS-value for the "padding" property.  
  
* __toggleButtonImgSrcTouch__  
  __Expects:__ String  
  __Default Value:__ 'data:image/svg+xml;utf8;base64,longBase64StringThatIAmNotGoingToWriteHere'  
  __Description:__  
  Here you can override the image displayed on the button to indicate that the element reacts to swipe interactions. Must be a base64-encoded String that will go into the url()-part of the CSS "background-image" property.  
  
* __toggleButtonImgSrcScroll__  
  __Expects:__ String  
  __Default Value:__ 'data:image/svg+xml;base64,anotherLongBase64String'  
  __Description:__  
  Here you can override the image displayed on the button to indicate that the element reacts to scroll interactions. Must be a base64-encoded String that will go into the url()-part of the CSS "background-image" property.  
  
* __toggleButtonImgSrcDenied__  
  __Expects:__ String  
  __Default Value:__ 'data:image/svg+xml;base64,alsoALongBase64String'  
  __Description:__  
  Here you can override the image displayed above the other two images to indicate that swiping / scrolling is currently disabled on the element. Must be a base64-encoded String that will go into the url()-part of the CSS "background-image" property.  
  
* __toggleButtonImgHeight__  
  __Expects:__ String  
  __Default Value:__ '32px'  
  __Description:__   
  Determines the height of the toggle button. Must be a valid CSS string that would fit the "height" property.  
  
* __toggleButtonImgWidth__  
  __Expects:__ String  
  __Default Value:__ '32px'  
  __Description:__  
  Determines the width of the toggle button. Must be a valid CSS string that would fit the "width" property.  
  
* __onTSEnabled__  
  __Expects:__ function  
  __Default Value:__ null  
  __Description:__  
  Here you can pass a callback function that will be executed when the unlocked element gets locked again.  
  
* __onTSDisabled__  
  __Expects:__ function  
  __Default Value:__ null  
  __Description:__  
  Here you can pass a callback function that will be executed when the locked element gets unlocked.  
  
