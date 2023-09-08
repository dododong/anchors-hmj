(function(){
  const INDICATOR_SCROLL_POSITIONS = [
    () => Math.floor($('.section-container').eq(0).outerHeight() - (window.innerWidth < 1279 ? 150 : 0)),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[0]() + $('.section-container').eq(1).outerHeight() + 50),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[1]() + $('.section-container').eq(2).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[2]() + $('.section-container').eq(3).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[3]() + $('.section-container').eq(4).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[4]() + $('.section-container').eq(5).outerHeight()),
    () => Math.floor(INDICATOR_SCROLL_POSITIONS[5]() + $('.section-container').eq(6).outerHeight()),
  ];
  const SECTION_IDS = ['exterior', 'interior', 'sustainability', 'fuelcellsystem', 'safety', 'aerodynamics', 'hyundaismartsense'];

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

    if($s.hasClass('type-dark') || setIndicatorTypeDark(wh, scrollDist,".interior-contents3")){
      $('#indicator').addClass('type-dark');
    } else {
      $('#indicator').removeClass('type-dark');
    }

    indicator.scrollLeft($('#indicator li').eq(lastPos).position().left);
  });

  // indicator click
  const indicator = $('#indicator');
  indicator.find('ul li a').each((idx, el) => {
    $(el).on('click', e => {
      e.preventDefault();
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