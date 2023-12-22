document.addEventListener('DOMContentLoaded', (e) => {
  const elements = document.querySelectorAll('.fade-in');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: .4
  }
  const callbacks = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }

  let observer = new IntersectionObserver(callbacks, options);
  elements.forEach(element => {
    observer.observe(element);
  });

  // // Lazy load images with class .lazy
  // var lazyloadImages;
  // if ("IntersectionObserver" in window) {
  //   lazyloadImages = document.querySelectorAll(".lazy");
  //   var imageObserver = new IntersectionObserver(function (entries, observer) {
  //     entries.forEach(function (entry) {
  //       if (entry.isIntersecting) {
  //         var image = entry.target;

  //         if(image.dataset.background_image){
  //           image.style.backgroundImage = `url(${image.dataset.background_image})`;
  //         }else{
  //           image.src = image.dataset.src;
  //         }

  //         image.classList.remove("lazy");
  //         imageObserver.unobserve(image);
  //       }
  //     });
  //   });

  //   lazyloadImages.forEach(function (image) {
  //     imageObserver.observe(image);
  //   });
  // } else {
  //   var lazyloadThrottleTimeout;
  //   lazyloadImages = document.querySelectorAll(".lazy");

  //   function lazyload() {
  //     if (lazyloadThrottleTimeout) {
  //       clearTimeout(lazyloadThrottleTimeout);
  //     }

  //     lazyloadThrottleTimeout = setTimeout(function () {
  //       var scrollTop = window.pageYOffset;
  //       lazyloadImages.forEach(function (img) {
  //         if (img.offsetTop < (window.innerHeight + scrollTop)) {
  //           if(img.dataset.background_image){
  //             img.style.backgroundImage = `url(${img.dataset.background_image})`;
  //           }else{
  //             img.src = img.dataset.src;
  //           }
            
  //           img.classList.remove('lazy');
  //         }
  //       });
  //       if (lazyloadImages.length == 0) {
  //         document.removeEventListener("scroll", lazyload);
  //         window.removeEventListener("resize", lazyload);
  //         window.removeEventListener("orientationChange", lazyload);
  //       }
  //     }, 20);
  //   }

  //   document.addEventListener("scroll", lazyload);
  //   window.addEventListener("resize", lazyload);
  //   window.addEventListener("orientationChange", lazyload);
  // }
});