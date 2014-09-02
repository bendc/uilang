/*
 * uilang v1.0.1
 * http://uilang.com
 */

document.addEventListener("DOMContentLoaded", function() {
  "use strict"

  var codeElements = document.querySelector('script[type="text/uilang"]')
  var i = codeElements.length
  if (!i) {
    return
  }
  var delimiter = "clicking on"
  var codeBlockContent = ""

  while (i--) {
    var code = codeElements[i]
    var content = code.textContent.trim()
    codeBlockContent += content+"\n";
  }

  function InstructionParsing(instruction) {
    var separator = instruction.charAt(0)
    var instructionSplit = instruction.split(separator)

    this.clickSelector = instructionSplit[1]
    this.classBehavior = instructionSplit[2].trim().split(" ")[0]
    this.classValue = instructionSplit[3]
    this.targetSelector = instructionSplit[5]
  }

  function UIElement(clickSelector, classBehavior, classValue, targetSelector) {
    this.clickSelector = clickSelector
    this.classBehavior = classBehavior.charAt(classBehavior.length-1) == "s"
                       ? classBehavior.substring(0, classBehavior.length-1)
                       : classBehavior
    this.classValue = classValue.charAt(0) == "."
                    ? classValue.substring(1, classValue.length)
                    : classValue
    this.targetSelector = targetSelector
    this.createEventListener()
  }

  UIElement.prototype.createEventListener = function() {
    var self = this
    var clicked = document.querySelectorAll(self.clickSelector)
    var i = clicked.length

    if (i < 1) {
      throw new Error("There's no element matching your \"" + self.clickSelector + "\" CSS selector.")
    }

    while (i--) {
      clicked.item(i).addEventListener("click", clickCallback)
    }

    function updateClass(el) {
      el.classList[self.classBehavior](self.classValue)
    }

    function clickCallback(e) {
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

  codeBlockContent.split(delimiter).forEach(function(data) {
    if (!data) return
    var params = new InstructionParsing(data.trim())
    new UIElement(
      params.clickSelector,
      params.classBehavior,
      params.classValue,
      params.targetSelector
    )
  })
})
