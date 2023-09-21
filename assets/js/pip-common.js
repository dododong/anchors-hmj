$.fn.parallax = function(diff, delay = 0) {
  this.addClass("parallax-item");
  this.data("parallaxData", { diff, delay });
};

(function() {
  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    $(".btn-menu").on("click", function() {
      $(".hmj-header.active").css("backdrop-filter", "unset");
    });

    const currScrollY = window.scrollY;
    const delta = currScrollY - lastScrollY;
    const wh = $(window).innerHeight();
    lastScrollY = currScrollY;

    if (delta < 0) {
      $("#menuWrap").addClass("with-gnb");
      $("#indicator").addClass("with-gnb");
    } else if (delta > 0) {
      $("#menuWrap").removeClass("with-gnb");
      $("#indicator").removeClass("with-gnb");
    }

    const hmjHeader = document.querySelector(".hmj-header");
    if (!hmjHeader.classList.contains("scr-chk")) {
      const modelMenuWrap = document.querySelector(".model-menu-wrap");
      modelMenuWrap.classList.add("with-gnb");
    }

    setParallaxItemsMarginTop(wh);
    setSectionContainerTop(wh);
    setPositionalOpacities(wh);
    setFadeInValues(wh);
  });

  gsap.fromTo("#keyVisualImg", 1.6, { opacity: 0 }, { opacity: 1 }).delay(0.2);
  gsap.fromTo(
    "#keyVisualImg",
    1,
    { transform: "scale(.3)", transformOrigin: "center" },
    { transform: "scale(1)" }
  );

  gsap.fromTo("#keyVisualImgM", 1.6, { opacity: 0 }, { opacity: 1 }).delay(0.2);
  gsap.fromTo(
    "#keyVisualImgM",
    1,
    { transform: "scale(.3)", transformOrigin: "center" },
    { transform: "scale(1)" }
  );

  gsap
    .fromTo(
      ".top-video-text h1, .top-video-text h6",
      1.5,
      { opacity: 0 },
      { opacity: 1 }
    )
    .delay(0.6);

  // 예시를 위해 넣어 두었습니다. 구현하시면서 빼세요
  // $('.power-your-world h1').parallax(200, 0);
  // $('.power-your-world p').parallax(200, .1);

  // 모바일 - 모델타이틀 클릭하면 나오는 메뉴
  $(".model-menu-wrap .model-menu h4.mo-only").click(function() {
    $(this).toggleClass("active");
    $(this).next(".model-menu-list").slideToggle();
  });
  $(".detail-nexo .hmj-content").click(function() {
    $(".hmj-container .model-menu h4").removeClass("active");
    $(".hmj-container .model-menu .model-menu-list").slideUp();
  });
})();

function getElementRect($el) {
  return {
    scroll: window.scrollY,
    offset: $el.offset().top,
    height: $el.outerHeight(),
    window: $(window).innerHeight(),
    whole: $(document).innerHeight()
  };
}

const TIME_FIX_BY_ELEMENT = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

function setParallaxItemsMarginTop(windowHeight) {
  $(".parallax-item").each((idx, el) => {
    const $el = $(el);
    const parallax = $el.data("parallaxData");
    const margin =
      parallax.diff * getArrivalRatio($el, windowHeight, parallax.delay);
    $el.css({ transform: `translate(0, ${margin}px` });
  });
}

function setSectionContainerTop(windowHeight) {
  $(".section-container").each((idx, el) => {
    const $el = $(el);
    const top = windowHeight - $el.outerHeight();
    if (idx > 0) $el.css({ top });
  });
}

function setPositionalOpacities(windowHeight) {
  $(
    ".section-container h1:not(.not-fadein), .section-container h2:not(.not-fadein), .section-container h3:not(.not-fadein), .section-container h4:not(.not-fadein), .section-container h5:not(.not-fadein), .section-container h6:not(.not-fadein), .section-container p:not(.not-fadein)"
  ).each((idx, el) => {
    const $el = $(el);
    if ($el.closest(".part-text").length) {
      return;
    }
    const delay = TIME_FIX_BY_ELEMENT.indexOf($el[0].tagName) * 0.1;
    const opacity = 1 - getArrivalRatio($el, windowHeight, delay);

    if (!$el.hasClass("section-title")) $el.css({ opacity });
  });
}

function setFadeInValues(windowHeight) {
  $(".is-fadein").each((idx, el) => {
    const $el = $(el);
    const opacity = 1 - getArrivalRatio($el, windowHeight);
    $el.css({ opacity });
  });
}

function getArrivalRatio($el, windowHeight, delay = 0) {
  return Math.min(
    Math.max(
      0,
      delay +
        2 *
          ($el.offset().top - window.scrollY - windowHeight / 2) /
          windowHeight
    ),
    1
  );
}

$(document).on("click", "#bgLocation", function(e) {
  e.preventDefault();
  if ($(this).hasClass("btn-type3")) {
  } else {
    $(this).removeClass("btn-type4").addClass("btn-type3");
    $("#bgStudio").addClass("btn-type4").removeClass("btn-type3");
  }

  $(".bg-gallery").removeClass("type-studio").addClass("type-location");
});
$(document).on("click", "#bgStudio", function(e) {
  e.preventDefault();
  if ($(this).hasClass("btn-type3")) {
  } else {
    $(this).removeClass("btn-type4").addClass("btn-type3");
    $("#bgLocation").addClass("btn-type4").removeClass("btn-type3");
  }
  $(".bg-gallery").addClass("type-studio").removeClass("type-location");
});

$(document).on("click", "#bgLocation1", function(e) {
  e.preventDefault();
  if ($(this).hasClass("btn-type3")) {
  } else {
    $(this).removeClass("btn-type4").addClass("btn-type3");
    $("#bgStudio1").addClass("btn-type4").removeClass("btn-type3");
  }

  $(this)
    .closest(".bg-gallery")
    .removeClass("type-studio")
    .addClass("type-location");
});
$(document).on("click", "#bgStudio1", function(e) {
  e.preventDefault();
  if ($(this).hasClass("btn-type3")) {
  } else {
    $(this).removeClass("btn-type4").addClass("btn-type3");
    $("#bgLocation1").addClass("btn-type4").removeClass("btn-type3");
  }
  $(this)
    .closest(".bg-gallery")
    .addClass("type-studio")
    .removeClass("type-location");
});
$(document).on("click", "#bgLocation2", function(e) {
  e.preventDefault();
  if ($(this).hasClass("btn-type3")) {
  } else {
    $(this).removeClass("btn-type4").addClass("btn-type3");
    $("#bgStudio2").addClass("btn-type4").removeClass("btn-type3");
  }

  $(this)
    .closest(".bg-gallery")
    .removeClass("type-studio")
    .addClass("type-location");
});
$(document).on("click", "#bgStudio2", function(e) {
  e.preventDefault();
  if ($(this).hasClass("btn-type3")) {
  } else {
    $(this).removeClass("btn-type4").addClass("btn-type3");
    $("#bgLocation2").addClass("btn-type4").removeClass("btn-type3");
  }
  $(this)
    .closest(".bg-gallery")
    .addClass("type-studio")
    .removeClass("type-location");
});

$(document).on("click", ".v-le .chip-color:first-of-type", function(e) {
  e.preventDefault();
  var $colorName = $(this).data("color-name");
  $(
    ".car-swiper .swiper-slide img, .car-swiper .swiper-pagination-bullet img"
  ).each(function() {
    var $this = $(this);
    $this.attr(
      "src",
      $this.attr("src").replace("/gallery_02_", "/gallery_01_")
    );
  });
  $("#colorName").html($colorName);
});
$(document).on("click", ".v-le .chip-color:nth-of-type(2)", function(e) {
  e.preventDefault();
  var $colorName = $(this).data("color-name");
  $(".bg-gallery").addClass("wh");
  $(
    ".car-swiper .swiper-slide img, .car-swiper .swiper-pagination-bullet img"
  ).each(function() {
    var $this = $(this);
    $this.attr(
      "src",
      $this.attr("src").replace("/gallery_01_", "/gallery_02_")
    );
  });
  $("#colorName").html($colorName);
});

$(document).on("click", ".v-le .chip-color", function(e) {
  e.preventDefault();
  if ($(this).hasClass("on")) {
  } else {
    $(".chip-color").toggleClass("on");
  }
});

let exColorList = {};

$(document).on("click", ".v-23my .type-exterior .chip-color", function(e) {
  e.preventDefault();
  var $colorName = $(this).data("color-name");
  var chipID = $(this).attr("id");

  if ($(this).hasClass("on")) {
  } else {
    $(".v-23my .type-exterior .chip-color").removeClass("on");
    $(this).addClass("on");
    $(
      ".car-swiper1 .swiper-slide img, .car-swiper1 .swiper-pagination-bullet img"
    ).each(function() {
      var $this = $(this);
      var url = $this.attr("src");
      var lm = url.split("/").reverse()[1];
      $this.attr("src", $this.attr("src").replace(lm, chipID));
    });
  }
  $("#colorNameEx").html($colorName);
});

$(document).on("click", ".v-23my .type-interior .chip-color", function(e) {
  e.preventDefault();
  var $colorName = $(this).data("color-name");

  if ($(this).hasClass("on")) {
  } else {
    $(".v-23my .type-interior .chip-color").removeClass("on");
    $(this).addClass("on");
  }
  $("#colorNameIn").html($colorName);
});
$(function() {
  if ($(".position-wrap").length == 1) {
    if ($(window).width() < tbl) {
      let swpOpt = {},
        slideLength = $(".position-wrap .swiper-slide").length;
      if (slideLength == 1) {
        swpOpt = {
          allowSlidePrev: false,
          allowSlideNext: false,
          simulateTouch: false
        };
        $('.position-wrap [class*="swiper-button"]').hide();
      } else {
        swpOpt = {
          pagination: {
            el: ".position-wrap .swiper-pagination",
            clickable: true
          },
          simulateTouch: true,
          slidesPerView: "1",
          speed: 300,
          loop: false,
          spaceBetween: 20,
          observer: true,
          observeParents: true
        };
      }
      let hdServiceSlide = new Swiper(
        ".position-wrap .swiper-container",
        swpOpt
      );
    }
  }
});
