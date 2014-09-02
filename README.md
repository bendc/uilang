# uilang

uilang is a dead simple programming language for web designers. With uilang, you write your code just like plain English, straight into your HTML using a `<code>` element. uilang's logic relies on manipulating classes on HTML elements and using these classes in CSS to show, hide, animate and transform elements when a click occurs. This simple logic lets designers create most of the typical user interface behaviours: tabs, popovers, overlays, sliding menus, etc.

## Getting started

The first thing to do is to include `uilang.js` on your page. [Download](http://uilang.com/lib/production/uilang.js) the minified version (1KB) and insert it anywhere in your HTML:

```html
<script src=uilang.js></script>
```
You're now ready to write some uilang. Your code should be inserted in a `<code>` element, preferably at the very end of your page (just before `</body>`). The syntax looks like this:

```html
<code>
  clicking on ".hide" adds class "hidden" on "div"
</code>
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
<code>
  clicking on ".hide"(1) adds(2) class "hidden"(3) on "div"(4)
</code>
```
1. Any CSS selector.
2. `adds`, `removes` or `toggles`.
3. Any class name.
4. Any CSS selector or the `target` keyword (which selects the clicked element).

You can add as many instructions as you want into your `<code>` element:

```html
<code>
  clicking on ".hide" adds class "hidden" on "div"
  clicking on "nav .tabs" adds class "active" on "target"
  clicking on "img:first-child" toggles class "big" on "target"
</code>
```
Don't worry about having other `<code>` elements on your page, uilang will only execute the one containing your uilang code.

Please note that uilang only supports click events. Hover effects can usually be achieved in CSS and other events are simply out of the scope of this language. By keeping its feature set light and focused, uilang aims to lower the barriers to entry into programming.

## Comments

Keep in mind uilang is basically just HTML, which means that you're already familiar with the syntax for comments:

```html
<code>
  <!-- I'm a comment. -->
  clicking on ".hide" adds class "hidden" on "div"

  <!-- I'm also a comment! -->
  clicking on "nav .tabs" adds class "active" on "target"
</code>
```

## Examples

* [Simple gallery](http://demos.uilang.com/gallery/)
* [Hamburger menu](http://demos.uilang.com/hamburger-menu/)
* [Looping Keynote-like presentation](http://demos.uilang.com/keynote/)
* [Sliding panels](http://demos.uilang.com/sliding-panels/)

You'll find more examples on [uilang.com](http://uilang.com).
