+function() {
  "use strict"

  location.protocol == "file:" && (document.documentElement.className = "development")

  var loadFlag = new Image
  loadFlag.src = "images/info-box-separator/right.svg" 
  loadFlag.addEventListener("load", function() {
    document.querySelector("header > div").className = "ready"
  })

  var root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body
  var transform = "transform" in root.style ? "transform" : "webkitTransform"
  var easeInOutCubic = function(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  }

  document.querySelector("#build-interfaces a").addEventListener("click", function(e) {
    var startTime
    var startPos = root.scrollTop
    var endPos = document.getElementById("examples").getBoundingClientRect().top
    var duration = 1000
    var scrollToExamples = function(timestamp) {
      startTime = startTime || timestamp
      var elapsed = timestamp - startTime
      var progress = easeInOutCubic(elapsed, startPos, endPos, duration)
      root.scrollTop = progress
      if (elapsed < duration) requestAnimationFrame(scrollToExamples)
    }
    requestAnimationFrame(scrollToExamples)
    e.preventDefault()
  })
}()
