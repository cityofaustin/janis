/*
loader.js handles loader animation that also accepts transtion effects! ✨

CSS Requirements / Recommendations:
- It's rommended to set the opacity of the elements passed to 0 in their respective css.
- While we do that here, their is a slight delay and you may see a "flicker" if not done in css first

HTML Requirements:
-  <div id="coa-loadingWheel"></div>

See example(s):
- As of 1/29/20: loader.js is besing used by ./components/pages/forms.js
*/

export const loader = {

  delay: 300, // in milliseconds

  start: function(params) {
    Object.assign(this, params)
    this.setValues()
    setTimeout(()=>{ // Pause a beat to allow page to load before animation
      this.loader.style.display = 'block'
      this.loader.style.opacity = 1
    }, this.delay)
  },


  setValues: function(){
    window.requestAnimationFrame(()=>{
      /*
        This "window.requestAnimationFrame" waits until react components have
        been added to the dom - so we can "grab" them by their Id here.
      */
      this.content = document.getElementById(this.contentId)
      this.loader = document.getElementById(this.loaderId)

      if (this.errorId) {
        this.error = document.getElementById(this.errorId)
        this.error.style.opacity = 0
      }

      if (this.style === "popup") {
        this.contentMarginTop = this.content.style.marginTop
      }

      const delay = this.delay / 1000

      this.loader.style.opacity = 0
      this.loader.style.transition = "opacity "+delay+"s"

      this.content.style.opacity = 0
      this.content.style.transition = "opacity "+delay+"s, margin-top "+delay+"s"

      this.error.style.opacity = 0
      this.error.style.transition = "opacity "+delay+"s, margin-top "+delay+"s"

    })
  },


  end: function() {
    if (this.error) {
      this.error.style.display = "none"
    }
    this.loader.style.opacity = 0
    setTimeout(()=>{
      this.loader.style.display = "none"
      this.content.style.opacity = 1
      this.content.style.marginTop = "0px"
    },this.delay)
  },


  endError: function() {
    this.error.style.opacity = 0
    this.loader.style.opacity = 0
    setTimeout(()=>{
      this.loader.style.display = 'none'
      this.error.style.opacity = 1
      if (this.style === "popup") {
        this.error.style.marginTop = "0px"
      }
    },this.delay)
  }


}
