
# GeoElements

**It's TERRIBLY Good&trade;.**

## WAT

So I grew up in the age of HTML3 and trying to explain to people that:

  1. You don't need to do everything in tables
  2. You can use CSS
  3. Never mind, here is GeoCities. Go experiment.

And the experimental joy and freedom of GeoCities was amazing. 

HTML3 had several elements that were deprecated later on, or were never actually part of the standard. Some of these 
were both handy and limiting. I recently wanted to learn more about custom elements and how to make them
So I made this. **GeoElements**! Improving upon the deprecated elements of old, and *improving* them.


## Features

- It's like HTML3 all over again!
- Relive the nostalgia of your youth
- Feel good that you are making something bad.
- Lots of thought put into making **The Terribleness&trade;** accessible to anyone using it.


## Usage/Examples

Begin by importing the elements into your page by including the script in your head section.
```html
<script src="https://unpkg.com/geo-elements/dist/geo-elements.iife.js"></script>
```

then you can use any of the following custom elements!


### `<ge-background>`

Originally the `<BODY>` tag had 2 (now deprecated) attributes:
 - [`background`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body#attr-background) - set the background image of the body
 - [`bgcolor`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body#attr-bgcolor) - set the background color of the body

These properties were quickly phased out when CSS was added as a standard. BUT NO LONGER! 

By default, this will fill your screen with the background in question.

You can use the `ge-background` tag with the following attributes

 - `background` (optional) - url to an image. If you use this, you will want to also provide an `alt` attribute. Just trust me on that.
 - `bgcolor` (optional) - No that is not a typo. This can be set only using `#ffffff` notation. (this is from the specification)
 - `alt` (required if `background` is set) - leave a description of your background image.
 - `inline` (optional) - if this attribute is set, it will make the wrapping element into an inline element rather than a block level one.

#### `ge-background` Example

```html
<ge-background background="./myImage.png" 
               alt="a very picturesque cloudy sky">
  <!-- Eveything in here will be on a beautiful cloudy sky -->
</ge-background>
```

### `<ge-font>`

This is the modern implementation of the [`<FONT>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/font) tag.

It supports all the features of the original, but also allows you to specify google fonts, and it will automatically add
the needed tag to the page for them to be loaded.

#### `ge-font` Example

```html
<ge-font face="'Rampart One'" size="7">
  This will be really big!
</ge-font>
```

### `<ge-img>`

So I wanted this to be an extension of the `img` tag, but safari currently does not support this.

So instead, I've made this into my own thing. This is an image tag that will load very slowly. It supports most attributes
from the image tag, and will load extremely slowly (imagine like you are on a dialup modem!). This really does play into
the nostalgia factor of the package.

Eventually, one day, I will be able to make this into an extension of the image element, and it'll be better because it 
will be a progressive enhancement.

Also, no, the speed is not adjustable. Is your modem speed adjustable? I thought not.

### `<ge-marquee>`

**(IN PROGRESS)**


This is a modern reimplementation of the much beloved [`marquee`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee) tag.

Once complete, it should offer more accessible methods of interaction for those using `prefers-reduced-motion`. 

The work to make it feature complete is priority one.

### `<ge-blink>`

The other much beloved tag, the [`blink`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blink) tag.

It blinks.

It doesn't if you prefer reduced motion.

### `<ge-center>`

a modern reinterpretation of the classic [`center`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center) tag.

We take it a step further and make it center things vertically too.

because apparently people still think that is hard.

### ~~`<ge-bgsound>`~~

Incomplete. Needs to be made.

This will be a reimplementation of the classic [`bgsound`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bgsound) tag
