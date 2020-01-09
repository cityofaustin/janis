export const scrollTransition = (
    {
      scrollDuration,
      fadeDelay,
      element,
      fadeElement,
      callback
    }
  )=>{

  const movePercent = 1 / (scrollDuration * 60)
  const bottom = element.pageYOffset
  let t = 1
  fadeElement.style.opacity = 1
  fadeElement.style.transition = "opacity "+fadeDelay+"s"

  const scrollTransitionGo = (moveTo)=>{
    if (t > 0) {
      element.scroll(0,moveTo)
      requestAnimationFrame(()=>{
        t -= movePercent || 1
        const next = (t < .5 ? 2*t*t : -1+(4-2*t)*t) * bottom // Quadratic transition
        scrollTransitionGo(next)
      })
    } else {
      element.scroll(0,0)
      fadeElement.style.opacity = 0
      setTimeout(function(){
        callback()
        fadeElement.style.opacity = 1
      },fadeDelay * 1000)
    }
  }

  scrollTransitionGo(element.pageYOffset)

}
