export const scrollTransition = ({
  scrollDuration,
  fadeDelay,
  endpoint=0,
  fadeElement,
  callback
})=>{
  // Just for handling build errors where window is undefined.
  if (typeof window === 'undefined'){
    return
  }

  const movePercent = 1 / (scrollDuration * 60)
  const bottom = window.pageYOffset
  let t = 1
  fadeElement.style.opacity = 1
  fadeElement.style.transition = "opacity "+fadeDelay+"s"

  const scrollTransitionGo = (moveTo)=>{
    if (t > 0 && moveTo > endpoint) {
      window.scroll(0, moveTo)
      requestAnimationFrame(()=>{
        t -= movePercent || 1
        let next = endpoint + (t < .5 ? 2*t*t : -1+(4-2*t)*t) * (bottom - endpoint) // Quadratic transition
        if (next <= endpoint) {
          next = endpoint
        }
        scrollTransitionGo(next)
      })
    } else {
      window.scroll(0,endpoint)
      fadeElement.style.opacity = 0
      setTimeout(function(){
        callback()
        fadeElement.style.opacity = 1
      },fadeDelay * 1000)
    }
  }

  scrollTransitionGo(window.pageYOffset)
}
