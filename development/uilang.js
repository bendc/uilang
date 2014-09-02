/*
 * uilang v1.0.1
 * http://uilang.com
 */

document.addEventListener("DOMContentLoaded", function() {
  "use strict"
  
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
  var classActions = [ 'add', 'remove', 'toggle' ]
  var instructionRegex = new RegExp('on\\s+(' + 
    Object.keys(events).join('|') +
  ')\\s+on\\s*"(.*)"\\s*(' +
    classActions.join('|')
  +')s?\\s+class\\s*"\\.?([^"]*)"\\s*on\\s*"([^"]*)"')
  
  var scriptElements = document.querySelectorAll('script[type="text/uilang"]')
  var scriptContent = Array.prototype.slice.call(scriptElements).map(function(el){ return el.textContent.split('\n') })
  var lines = []
  lines = lines.concat.apply(lines, scriptContent)
  
  lines.forEach(function(instruction) {
    instruction = instruction.trim()
    if (!instruction) return
    instruction = instruction.replace(/^clicking on/,'on click on') //Supporting old version
    var matches = instruction.match(instructionRegex)
    if (!matches) throw new Error("Invalid line \"" + instruction + "\"" )

    var data = {
      eventType: matches[1],
      listenerSelector: matches[2],
      classBehavior: matches[3],
      classValue: matches[4],
      targetSelector: matches[5]
    }
    createEventListener(data)
  })

  function createEventListener(self) {
    var listeners = document.querySelectorAll(self.listenerSelector)
    var i = listeners.length

    if (i < 1) {
      throw new Error("There's no element matching your \"" + self.listenerSelector + "\" CSS selector.")
    }

    while (i--) {
      listeners.item(i).addEventListener(events[self.eventType], callback)
    }

    function updateClass(el) {
      el.classList[self.classBehavior](self.classValue)
    }

    function callback(e) {
      switch (self.targetSelector) {
        case "target" :
        case "this"   :
        case "it"     :
        case "itself" :
        case undefined:
          updateClass(e.target)
          break
        default:
          var target = document.querySelectorAll(self.targetSelector)
          var i = target.length
          while (i--) {
            updateClass(target.item(i))
          }
      }
      if (e.target.nodeName.toLowerCase() == "a") {
        e.preventDefault()
      }
    }
  }
})
