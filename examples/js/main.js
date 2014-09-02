["main", "github"].forEach(function(stylesheet) {
  var link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "css/" + stylesheet + ".css"
  document.head.appendChild(link)
})

document.addEventListener("DOMContentLoaded", function() {
  var codeBlocks = document.querySelectorAll("pre code")
  var i = codeBlocks.length
  while (i--) hljs.highlightBlock(codeBlocks.item(i))

  var disabledPopoverLinks = document.querySelectorAll("#examples #nav a")
  var i = disabledPopoverLinks.length
  while (i--) disabledPopoverLinks.item(i).addEventListener("click", function(e) {
    e.preventDefault()
  })

  // stupid hack to force layout
  var activeTabContent = document.querySelector("#examples > li:nth-child(4) .preview h1.active + p")
  activeTabContent.style.display = "none"
  setTimeout(function() {
    activeTabContent.removeAttribute("style")
  }, 40)
})
