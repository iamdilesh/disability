$(document).ready(function() {
  var root = (typeof exports == 'undefined' ? window : exports),
  imageHeight,
  wrapperHeight,
  overlap,
  $container = $('#article-header'),
  centerImage = function() {
    if ($container.width() >= 480) {       
      imageHeight = $container.find('img').height();
      wrapperHeight = $container.height();
      overlap = (wrapperHeight - imageHeight) / 2;
      $container.find('img').css('margin-top', overlap);
    }
    else {
      $container.find('img').css('margin-top', 0);
    }
  },
  isDesktopRetina = function() {
    var retinaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
    (min--moz-device-pixel-ratio: 1.5),\
    (-o-min-device-pixel-ratio: 3/2),\
    (min-resolution: 1.5dppx)",
    widthQuery = "(min-device-width: 800px)";
    
    if (root.matchMedia && root.matchMedia(widthQuery).matches) {
      if (root.devicePixelRatio > 1)
      return true;

      if (root.matchMedia(retinaQuery).matches)
      return true;
    }
    return false;
  };
  /*
  $(window).on("load resize", centerImage);

  var el = document.getElementById('article-header');
  if (el.addEventListener) {  
    el.addEventListener("webkitTransitionEnd", centerImage, false); // Webkit event
    el.addEventListener("transitionend", centerImage, false); // FF event
    el.addEventListener("oTransitionEnd", centerImage, false); // Opera event
  }
  */
  
  $('figure.infographic').each(function(){
    var $figure = $(this),
    $img = $figure.find('img'),
    src = $img.attr('src').replace('img/', ''),
    $enlarge = $('<a/>').text('Enlarge').addClass('enlarge').attr('href', 'enlarge.html#'+src);    
    $figure.append($enlarge);
  });

  $(".video-wrapper").fitVids();
  
  if (isDesktopRetina()) {
    var $images = $('img.retina').each(function(i){
      var $img = $(this),
      src = $img.attr('src'),
      retinaSrc = src.replace(/\.\w+$/, function(match) { return "@2x" + match; }),
      preload = $('<img/>').attr('src', src).load(function(){
        $img.attr('src', retinaSrc).addClass('processed');
      });
    });
  }
  
  $('.slideshow').each(function(){
    var $wrapper = $(this),
    $slideshow = $wrapper.find('ul.slides'),
    $slides = $slideshow.find('li'),
    max = $slides.length,
    current = 0,
    $pager = $('<ul>').addClass('pager'),
    $prev = $('<a/>').attr('href', '#').addClass('prev').html('&laquo;').click(function(e){
      e.preventDefault();
      current--;
      if (current < 0) {
        current = max - 1;
      }
      $slides.hide();
      $slides.eq(current).show();
    }),
    $next = $('<a/>').attr('href', '#').addClass('next').html('&raquo;').click(function(e){
      e.preventDefault();
      current++;
      if (current >= max) {
        current = 0;
      }
      $slides.hide();
      $slides.eq(current).show();
    });
    $pager.append($('<li>').html($prev));
    $pager.append($('<li>').html($next));
    $wrapper.append($pager);
  });

});
