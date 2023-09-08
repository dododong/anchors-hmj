(function(){

  const INDICATOR_SCROLL_POSITIONS = [
    () => Math.floor($('.section-container').eq(0).outerHeight() + $('.section-container').eq(1).outerHeight() - (window.innerWidth < 1279 ? 150 : 0)),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[0]() + $('.section-container').eq(2).outerHeight() + 50),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[1]() + $('.section-container').eq(3).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[2]() + $('.section-container').eq(4).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[3]() + $('.section-container').eq(5).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[4]() + $('.section-container').eq(6).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[5]() + $('.section-container').eq(7).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[6]() + $('.section-container').eq(8).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[7]() + $('.section-container').eq(9).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[8]() + $('.section-container').eq(11).outerHeight() + $('.section-container').eq(12).outerHeight() + ($('.section-container').eq(13).outerHeight()*2/3)),
  ];
  const SECTION_IDS = ['exterior', 'interior', 'v2lv2h', 'charging', 'egmp', 'technology', 'hyundaismartsense', 'connectedcar', 'gallery', 'program'];

  const hashHandler = () => {
    const secIdx = SECTION_IDS.indexOf(window.location.hash.substr(1));
    if (secIdx >= 0) {
      $('html, body').animate({scrollTop: INDICATOR_SCROLL_POSITIONS[secIdx]()}, 1000);
    }
  };

  hashHandler();

  window.addEventListener('hashchange', () => hashHandler());

  window.addEventListener('scroll', () => {
    const currScrollY = window.scrollY;
    const sectionIndicator = $('.section-indicator');
    const wh = $(window).innerHeight();
    const scrollDist = $(window).scrollTop() + 142;

    const lastPos = INDICATOR_SCROLL_POSITIONS.reduce((res, pf, i) => {
      if (currScrollY >= pf() && i > res) return i;
      return res;
    }, -1);

    const $s = sectionIndicator.eq(lastPos);
    if (lastPos >= 0) {
      $('#indicator').show();
      $('#indicator li').eq(lastPos).addClass('active').siblings().removeClass('active');
    } else {
      $('#indicator').hide();
      $('#indicator li').removeClass('active');
    }
    if ($s.hasClass('type-dark') || setIndicatorTypeDark(wh, scrollDist,".exterior03")){
      $('#indicator').addClass('type-dark');
    } else {
      $('#indicator').removeClass('type-dark');
    }

    indicator.scrollLeft($('#indicator li').eq(lastPos).position().left);

    setChargingImagesEffects(wh);
    setInteriorImagesEffects(wh);

    if ($(window).scrollTop() > 180) {
    	$(".detail-ioniq5 .model-menu-wrap .on-scroll").addClass('is-show');
    } else {
    	$(".detail-ioniq5 .model-menu-wrap .on-scroll").removeClass('is-show');
    }
  });

  const indicator = $('#indicator');

  // indicator click
  indicator.find('ul li a').each((idx, el) => {
    $(el).on('click', e => {
      e.preventDefault();
      console.log(INDICATOR_SCROLL_POSITIONS[idx]());
      $('html, body').animate({scrollTop: INDICATOR_SCROLL_POSITIONS[idx]() + 1}, 1000);

      indicator.animate({scrollLeft: $(el).position().left}, 1000);
    });
  });
})();

function setIndicatorTypeDark(wh, scrollDist, elClassName) {
  const classSelector = $(elClassName);
  const elOffsetTop = classSelector.offset().top;
  const elOuterHeight = classSelector.outerHeight();

  return scrollDist > (elOffsetTop + elOuterHeight - wh) && scrollDist < (elOffsetTop + elOuterHeight);
}

function setChargingImagesEffects(wh) {
  const $i1 = $('#chargingImgSet1');
  const $i2 = $('#chargingImgSet2');
  const $i3 = $('#chargingImgSet3 > img');
  const p1 = getArrivalRatio($i1, wh) * 1.3 - .3;
  const p2 = getArrivalRatio($i2, wh) * 1.3 - .3;
  const p3 = getArrivalRatio($i3, wh) * 1.3 - .3;
  $i1.css({opacity: 1 - p1, ...(window.innerWidth < 1120 ? {} : {marginTop: (40 * p1) + 'px'})});
  $i2.css({opacity: 1 - p2, ...(window.innerWidth < 1120 ? {} : {marginRight: (60 * p2) + 'px', marginLeft: (-60 * p2) + 'px'})});
  $i3.css({opacity: 1 - p3, ...(window.innerWidth < 1120 ? {} : {marginRight: (-60 * p3) + 'px', marginLeft: (60 * p3) + 'px'})});
}

function setInteriorImagesEffects(wh) {
  const modValue = (v) => Math.max(0, v * 1.3 - .3);
  const $parallax11 = $('.section-interior03 .parallax01');
  const $parallax12 = $('.section-interior03 .parallax02');
  const $parallax13 = $('.section-interior03 .parallax03');
  const $parallax21 = $('.section-interior03 .parallax04');
  const $parallax22 = $('.section-interior03 .parallax05');
  const $parallax23 = $('.section-interior03 .parallax06');
  const $parallax31 = $('.section-interior03 .parallax07');
  const $parallax32 = $('.section-interior03 .parallax08');
  const $parallax33 = $('.section-interior03 .parallax09');

  const parallax11 = modValue(getArrivalRatio($parallax11, wh));
  const parallax12 = modValue(getArrivalRatio($parallax12, wh));
  const parallax13 = modValue(getArrivalRatio($parallax13, wh));
  const parallax21 = modValue(getArrivalRatio($parallax21, wh));
  const parallax22 = modValue(getArrivalRatio($parallax22, wh));
  const parallax23 = modValue(getArrivalRatio($parallax23, wh));
  const parallax31 = modValue(getArrivalRatio($parallax31, wh));
  const parallax32 = modValue(getArrivalRatio($parallax32, wh));
  const parallax33 = modValue(getArrivalRatio($parallax33, wh));

  $parallax11.css({opacity: 1 - parallax11, top: parallax11 * 50});
  $parallax12.css({opacity: 1 - parallax12, top: parallax12 * 50});
  $parallax13.css({opacity: 1 - parallax13, top: parallax13 * 50});
  $parallax21.css({opacity: 1 - parallax21, top: parallax21 * 80});
  $parallax22.css({opacity: 1 - parallax22, top: parallax22 * 100});
  $parallax23.css({opacity: 1 - parallax23, top: parallax23 * 120});
  $parallax31.css({opacity: 1 - parallax31, top: parallax31 * 170});
  $parallax32.css({opacity: 1 - parallax32, top: parallax32 * 150});
  $parallax33.css({opacity: 1 - parallax33, top: parallax33 * 130});
}

function getArrivalRatio($el, windowHeight, delay = 0) {
  return Math.min(Math.max(0, delay + 2 * ($el.offset().top - window.scrollY - windowHeight / 2) / windowHeight), 1);
}

