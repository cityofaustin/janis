/*
loader.js handles loader animation that also accepts transtion effects! ✨

CSS Requirements / Recommendations:
- It's rommended to set the opacity of the elements passed to 0 in their respective css.
- While we do that here, their is a slight delay and you may see a "flicker" if not done in css first

HTML Requirements:
-  <div id="coa-<component-anme>_loading-wheel"></div>

See example(s):
- As of 1/29/20: loader.js is besing used by ./components/pages/forms.js
*/

export const loader = {

  delay: 300, // in milliseconds

  start: function(params) {
    Object.assign(this, params)
    this.setValues()
    setTimeout(()=>{ // Pause a beat to allow page to load before animation
      if (this.loader && this.loader.style) {
        this.loader.style.display = 'block'
      }
      if (this.loader && this.loader.style) {
        this.loader.style.opacity = 1
      }
    }, this.delay)
  },


  setValues: function(){
    this.content = document.getElementById(this.contentId)
    this.loader = document.getElementById(this.loaderId)

    if (this.errorId) {
      this.error = document.getElementById(this.errorId)
      if (this.error.style) {
        this.error.style.opacity = 0
      }
    }

    if (this.style && this.style === "popup" && this.content.style) {
      this.contentMarginTop = this.content.style.marginTop
    }

    const delay = this.delay / 1000

    if (this.loader.style && this.content.style) {
      this.loader.style.opacity = 0
      this.loader.style.transition =`opacity ${delay}s`
      this.content.style.opacity = 0
      this.content.style.transition = `opacity ${delay}s, margin-top ${delay}s`
    }

    if (this.error && this.error.style) {
      this.error.style.opacity = 0
      this.error.style.transition = `opacity ${delay}s, margin-top ${delay}s`
    }
  },


  end: function() {
    if (this.error && this.error.style) {
      this.error.style.display = "none"
    }
    if (this.loader.style) {
      this.loader.style.opacity = 0
    }
    setTimeout(()=>{
      if (this.loader.style && this.content.style) {
        this.loader.style.display = "none"
        this.content.style.opacity = 1
        this.content.style.marginTop = "0px"
      }
    },this.delay)
  },


  endError: function() {
    if (this.error && this.error.style) {
      this.error.style.opacity = 0
    }
    if (this.loader && this.loader.style) {
      this.loader.style.opacity = 0
    }
    setTimeout(()=>{
      if (this.loader && this.loader.style) {
        this.loader.style.display = 'none'
      }
      if (this.error && this.error.style) {
        this.error.style.opacity = 1
      }
      if (this.style === "popup" && this.error.style) {
        this.error.style.marginTop = "0px"
      }
    },this.delay)
  }


}
