# uilang

uilang is a dead simple programming language for web designers. With uilang, you write your code just like plain English, straight into your HTML using a `<script>` element. uilang's logic relies on manipulating classes on HTML elements and using these classes in CSS to show, hide, animate and transform elements when a click occurs. This simple logic lets designers create most of the typical user interface behaviours: tabs, popovers, overlays, sliding menus, etc.


## Fork changelog

This fork adds support for other events (thanks to the new syntax `on EVENT on` and a RegExp) and is based on [laurentj fork](https://github.com/laurentj/uilang/) which adds support for `<script type="text/uilang"></script>`.

The supported events are:

    var events = { 
        'click': 'click', 
        'context menu': 'contextmenu',
        'double click': 'dblclick',
        'mouse down': 'mousedown',
        'mouse up': 'mouseup',
        'mouse enter': 'mouseenter',
        'mouse leave': 'mouseleave',
        'mouse over': 'mouseover',
        'mouse out': 'mouseout',
        'input blur': 'blur',
        'input change': 'change',
        'input focus': 'focus',
        'form reset': 'reset',
        'form submit': 'submit'
      }

## Getting started

The first thing to do is to include `uilang.js` on your page. [Download](http://uilang.com/lib/production/uilang.js) the minified version (1KB) and insert it anywhere in your HTML:

```html
<script src=uilang.js></script>
```
You're now ready to write some uilang. Your code should be inserted in a `<script>` element with a `type` attribute, anywhere in the page. The syntax looks like this:

```html
<script type="text/uilang">
  on click on ".hide" adds class "hidden" on "div"
</script>
```
This is pretty much the only syntax you'll have to learn. This code is straightforward: when you click on an element with a `hide` class, a `hidden` class will be added to every `div`.

Now, this `hidden` class can be used in your CSS to actually hide these `div`s with, for example, a simple fade-out effect:

```css
div {
  transition: opacity .5s;
}
div.hidden {
  opacity: 0;
}
```
## Syntax

Let's deconstruct the syntax from our previous example:

```html
<script type="text/uilang">
  on click on ".hide"(1) adds(2) class "hidden"(3) on "div"(4)
</script>
```
1. Any CSS selector.
2. `adds`, `removes` or `toggles`.
3. Any class name.
4. Any CSS selector or the `target` keyword (which selects the clicked element).

You can add as many instructions as you want into your `<script>` element (and many `<script>` element as you want):

```html
<script type="text/uilang">
  on click on ".hide" adds class "hidden" on "div"
  on click on "nav .tabs" adds class "active" on "target"
</script>
....
<script type="text/uilang">
  on click on "img:first-child" toggles class "big" on "target"
</script>
```

Please note that uilang only supports click events. Hover effects can usually be achieved in CSS and other events are simply out of the scope of this language. By keeping its feature set light and focused, uilang aims to lower the barriers to entry into programming.

## Comments

Keep in mind uilang is basically just HTML, which means that you're already familiar with the syntax for comments:

```html
<script type="text/uilang">
  <!-- I'm a comment. -->
  on click on ".hide" adds class "hidden" on "div"

  <!-- I'm also a comment! -->
  on click on "nav .tabs" adds class "active" on "target"
</script>
```

## Examples

* [Simple gallery](http://demos.uilang.com/gallery/)
* [Hamburger menu](http://demos.uilang.com/hamburger-menu/)
* [Looping Keynote-like presentation](http://demos.uilang.com/keynote/)
* [Sliding panels](http://demos.uilang.com/sliding-panels/)

You'll find more examples on [uilang.com](http://uilang.com).
