jQuery(function($){$.fn.foxlazy=function(threshold,callback){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-lazy-src-retina":"data-lazy-src",images=this,loaded;this.one("foxlazy",function(){var source=this.getAttribute(attrib);source=source||this.getAttribute("data-lazy-src");if(source){this.setAttribute("src",source);if($(this).hasClass('s-img-switch')){$(this).parent().css('background-image','url('+ source+')');$(this).hide();}}
if(typeof callback==="function")callback.call(this);});function foxlazy(){var inview=images.filter(function(){var $e=$(this);if($e.is(":hidden"))return;var wt=$w.scrollTop(),wb=wt+ $w.height(),et=$e.offset().top,eb=et+ $e.height();return eb>=wt- th&&et<=wb+ th;});loaded=inview.trigger("foxlazy");images=images.not(loaded);}
$w.on("scroll.foxlazy resize.foxlazy lookup.foxlazy",foxlazy);foxlazy();return this;};});