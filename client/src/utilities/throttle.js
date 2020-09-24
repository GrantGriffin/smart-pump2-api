function throttle (callback, limit) {
  var wait = false
  return function () {
      if (!wait) {
          callback()
          wait = true
          setTimeout(function () {   
              wait = false;          
          }, limit)
      }
  }
}

export default throttle