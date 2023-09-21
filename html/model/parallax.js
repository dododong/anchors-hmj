class ParallaxAnimation {
  constructor() {
    this.timeline = gsap.timeline({ paused: true });
    this.timeline1 = gsap.timeline({ paused: true });
    this.timeline2 = gsap.timeline({ paused: true });
    this.timeline3 = gsap.timeline({ paused: true });
    this.timeline4 = gsap.timeline({ paused: true });
    this.timeline5 = gsap.timeline({ paused: true });
    this.timeline6 = gsap.timeline({ paused: true });
    this.timeline7 = gsap.timeline({ paused: true });
    this.timeline8 = gsap.timeline({ paused: true });
    this.timeline9 = gsap.timeline({ paused: true });

    this.isEnd = false;
    this.isAnimating = false;
    this.currentStep = 0;
    this.frame = 0.033;
    this.startY = 0;
    this.isScrollingAutomatically = false;
    this.isMobile = false;

    this.initializeTimelines();
    this.touchStart = this.handleStart.bind(this);
    this.touchEnd = this.handleScroll.bind(this);
    this.wheel = this.handleScroll.bind(this);
    this.highLightsClassArray = [
      "part-text-one",
      "part-text-two",
      "part-text-three",
      "part-text-four",
      "part-text-five",
      "part-text-six",
      "part-text-seven",
      "part-text-eight",
      "part-text-nine"
    ];

    this.loadedImages = [];

    this.element = document.querySelector(".highlights");
    this.buttonGroup = document.querySelector(".button-group");
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
    this.isLoadingComplete = false;

    ScrollTrigger.create({
      trigger: ".highlights",
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        this.lockAndScroll();
      },
      onEnterBack: () => {
        this.lockAndScroll();
      }
    });

    this.yOffset = document.querySelector(".highlights").offsetTop;
    this.lastStepCount = 9;
    this.exteriorMoveY = 0;
    this.interiorMoveY = 0;

    this.btnTop = document.getElementById("reset-highlight");
    if (this.btnTop) {
      this.btnTop.addEventListener("click", this.reset.bind(this));
    }
  }

  reset(e) {
    this.resetScroll();
    this.isScrollingAutomatically = false;
    this.currentStep = 0;
    this.nowTimeline.pause(0);
    gsap.set(
      "#part-car img, .part-text, .explain-highlights, .kona .highlights",
      {
        clearProps: "all"
      }
    );
  }
  resetScroll() {
    this.scrollStart = false;
    gsap.killTweensOf(window);
    clearInterval(this.intervalID);
    document.body.style.overflow = "";
    this.isScrollingAutomatically = true;
    const imgElement = document.querySelector("#part-car img");
    const [firstImagePath] = this.addImage(1, 2);
    if (imgElement && firstImagePath) {
      imgElement.src = firstImagePath;
      imgElement.style.opacity = 0;
    }
  }

  lockAndScroll() {
    if (
      this.isLoadingComplete === false ||
      this.scrollStart ||
      this.isScrollingAutomatically
    )
      return;
    document.body.style.overflow = "hidden";
    this.buttonGroup.style.visibility = "visible";
    this.runTimeline(this.timeline);
    this.currentStep++;
    this.scrollStart = true;

    this.intervalID = setInterval(() => {
      gsap.to(window, {
        duration: 0.1,
        scrollTo: { y: this.element.offsetTop },
        ease: "power1.inOut",
        onComplete: () => {
          this.isScrollingAutomatically = false;
        }
      });
    }, 300);
  }

  classNameChange() {
    const classes = this.element.className.split(" ");
    const highlightsIndex = classes.indexOf("highlights");
    const newClasses = classes.slice(0, highlightsIndex + 1);
    newClasses.push(this.highLightsClassArray[this.currentStep]);
    this.element.className = newClasses.join(" ");
  }

  addImage(start, count) {
    const mediaQuery = window.matchMedia("(max-width: 1119px)");
    let path;
    if (mediaQuery.matches) {
      //모바일시 경로
      path = "../../Image/mobile/";
      this.exteriorMoveY = "0%";
      this.interiorMoveY = "10%";
      this.isMobile = true;
    } else {
      //PC버전시 경로
      path = "../../Image/pc/";
      this.exteriorMoveY = "-50%";
      this.interiorMoveY = "350%";
      this.isMobile = false;
    }
    let images = [];
    for (let i = start; i < start + count; i++) {
      let imageNumber = String(Math.floor(i)).padStart(4, "0");
      images.push(path + imageNumber + ".webp");
    }
    return images;
  }

  updateImage(index, images) {
    if (images[index - 1] === undefined || index <= 0) {
      return;
    }
    $(".part-visual img").attr("src", images[index - 1]);
  }

  addSwipeListeners() {
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchend", this.touchEnd);
  }

  removeSwipeListeners() {
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchend", this.touchEnd);
  }

  enableScroll() {
    window.addEventListener("wheel", this.wheel);
    this.addSwipeListeners();
  }

  disableScroll() {
    window.removeEventListener("wheel", this.wheel);
    this.removeSwipeListeners();
  }

  handleStart(e) {
    const touch = e.touches[0];
    this.startY = touch.clientY;
  }

  getImages(n, m) {
    return this.loadedImages.slice(n - 1, m);
  }

  initializeTimelines() {
    let allImage = this.addImage(1, 690);
    const localExteriorMoveY = this.exteriorMoveY;
    const localInteriorMoveY = this.interiorMoveY;

    const preloadImages = () => {
      const imagePromises = allImage.map(
        (src, index) =>
          new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              this.loadedImages[index] = img;
              resolve();
            };
          })
      );
      Promise.all(imagePromises).then(() => {
        this.startAnimation(localExteriorMoveY, localInteriorMoveY);
      });
    };

    preloadImages();

    this.startAnimation = (exteriorMoveY, interiorMoveY) => {
      this.isLoadingComplete = true;
      let newY = 0;

      this.timeline.to("#part-car img", {
        duration: 0.5,
        opacity: 1,
        ease: "back.in"
      });

      this.timeline.add(
        gsap.set(".explain-highlights", {
          opacity: 1
        })
      );

      this.timeline.add(
        gsap.set(".explain-highlights p", {
          opacity: 1
        })
      );

      let images = this.getImages(1, 35);
      images.forEach((image, index) => {
        this.timeline.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      this.timeline.add(
        gsap.to(".part-text.one", {
          duration: 0.5,
          y: exteriorMoveY,
          opacity: 1,
          ease: Back.linear,
          delay: 0.5
        }),
        1
      );

      //End : Step-1

      this.timeline1.to(".part-text.one", 0.5, {
        duration: 0.5,
        opacity: 0,
        y: "-250%",
        ease: Back.linear
      });

      let images1 = this.getImages(36, 60);
      images1.forEach((image, index) => {
        this.timeline1.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      this.timeline1.add(
        gsap.to(".part-text.two", {
          duration: 0.5,
          y: exteriorMoveY,
          opacity: 1,
          ease: Back.linear
        }),
        2
      );

      //End : Step-2

      this.timeline2.to(".part-text.two", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linea
      });

      let images2 = this.getImages(61, 150);
      images2.forEach((image, index) => {
        this.timeline2.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      this.timeline2.add(
        gsap.to(".part-text.three", {
          duration: 0.5,
          y: exteriorMoveY,
          opacity: 1,
          ease: Back.linear,
          delay: 2.2
        }),
        0.5
      );

      let timeline2_child = gsap.timeline({ paused: true });
      let images2_child = this.getImages(151, 170);
      images2_child.forEach((image, index) => {
        timeline2_child.set(
          "#part-car img",
          { attr: { src: image.src } },
          1 + index * this.frame
        );
      });

      timeline2_child.to(
        ".kona .highlights",
        {
          duration: 1,
          backgroundImage:
            "linear-gradient(to bottom, #1E1A19 20%, #1E1A19 59%, #d9dfe5)",
          ease: Back.linear
        },
        0
      );

      timeline2_child.to(
        ".part-text.three",
        {
          duration: 1,
          color: "#ffffff",
          ease: Back.linear
        },
        0
      );

      timeline2_child.to(
        ".explain-highlights",
        {
          duration: 1,
          color: "#ffffff",
          ease: Back.linear
        },
        0
      );

      let timeline2_child_1 = gsap.timeline({ paused: true });

      timeline2_child_1.to(
        ".part-text.three",
        {
          duration: 1,
          color: "#000",
          ease: Back.linear,
          delay: 1
        },
        0
      );

      timeline2_child_1.to(
        ".explain-highlights",
        {
          duration: 1,
          color: "#000",
          ease: Back.linear,
          delay: 1
        },
        0
      );

      timeline2_child_1.to(
        ".kona .highlights",
        {
          duration: 1,
          backgroundImage:
            "linear-gradient(to bottom, #fff 20%, #dee2e5 59%, #d9dfe5)",
          ease: Back.linear,
          delay: 1
        },
        0
      );
      let images2_child_1 = this.getImages(171, 190);
      images2_child_1.forEach((image, index) => {
        timeline2_child_1.set(
          "#part-car img",
          { attr: { src: image.src } },
          1 + index * this.frame
        );
      });

      this.timeline2.add(timeline2_child.restart());
      this.timeline2.add(timeline2_child_1.restart());

      //End : Step-3

      this.timeline3.to(".part-text.three", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      let images3 = this.getImages(191, 330);
      images3.forEach((image, index) => {
        this.timeline3.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      let timeline3_child = gsap.timeline({ paused: true });
      let images3_child = this.getImages(331, 430);
      images3_child.forEach((image, index) => {
        timeline3_child.set(
          "#part-car img",
          { attr: { src: image.src } },
          1 + index * this.frame
        );
      });

      const four = this.isMobile ? 40 : 0;
      newY = parseFloat(exteriorMoveY) - four + "%";

      timeline3_child.add(
        gsap.to(".part-text.four", {
          duration: 0.5,
          y: newY,
          opacity: 1,
          ease: Back.linear
        })
      );

      this.timeline3.add(timeline3_child.restart());

      //End : Step-4

      this.timeline4.to(".part-text.four", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      let images4 = this.getImages(431, 460);
      images4.forEach((image, index) => {
        this.timeline4.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      const five = this.isMobile ? 40 : 0;
      newY = parseFloat(exteriorMoveY) - five + "%";

      this.timeline4.add(
        gsap.to(".part-text.five", {
          duration: 0.5,
          y: newY,
          opacity: 1,
          ease: Back.linear
        })
      );
      //End : Step-4

      this.timeline5.to(".part-text.five", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      let images5 = this.getImages(461, 540);
      images5.forEach((image, index) => {
        this.timeline5.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      this.timeline5.add(
        gsap.to(".kona .highlights", {
          duration: 1,
          backgroundImage:
            "linear-gradient(to bottom, #1E1A19 20%, #1E1A19 59%, #d9dfe5)",
          ease: Back.linear
        })
      );

      const six = this.isMobile ? 0 : 100;
      newY = parseFloat(interiorMoveY) - six + "%";

      this.timeline5.add(
        gsap.to(".part-text.six", {
          duration: 0.5,
          y: newY,
          opacity: 1,
          ease: Back.linear
        })
      );

      //End : Step-5

      this.timeline6.to(".part-text.six", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      let images6 = this.getImages(541, 560);
      images6.forEach((image, index) => {
        this.timeline6.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      this.timeline6.add(
        gsap.to(".part-text.seven", {
          duration: 0.5,
          y: interiorMoveY,
          opacity: 1,
          ease: Back.linear
        })
      );
      //End : Step-6

      this.timeline7.to(".part-text.seven", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      let images7 = this.getImages(561, 580);
      images7.forEach((image, index) => {
        this.timeline7.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      this.timeline7.add(
        gsap.to(".part-text.eight", {
          duration: 0.5,
          y: interiorMoveY,
          opacity: 1,
          ease: Back.linear
        })
      );

      //End : Step-7

      this.timeline8.to(".part-text.eight", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      let images8 = this.getImages(581, 690);
      images8.forEach((image, index) => {
        this.timeline8.set(
          "#part-car img",
          { attr: { src: image.src } },
          index * this.frame
        );
      });

      const nine = this.isMobile ? 40 : 300;
      newY = parseFloat(interiorMoveY) - nine + "%";

      this.timeline8.add(
        gsap.to(".part-text.nine", {
          duration: 0.5,
          y: newY,
          opacity: 1,
          ease: Back.linear
        })
      );

      //End : Step-8

      this.timeline9.to(".part-text.nine", 0.5, {
        duration: 0.5,
        y: "-250%",
        opacity: 0,
        ease: Back.linear
      });

      this.timeline9.to("#part-car img", 0.5, {
        duration: 0.5,
        opacity: 0,
        ease: Back.linear
      });

      this.timeline9.add(
        gsap.to(".kona .highlights", {
          duration: 1,
          backgroundImage:
            "linear-gradient(to bottom, #fff 20%, #dee2e5 59%, #d9dfe5)",
          ease: Back.linear
        })
      );
    };
  }

  runTimeline(tl) {
    this.isAnimating = true;
    this.disableScroll();
    this.classNameChange();
    tl.restart().eventCallback("onComplete", () => {
      this.enableScroll();
      this.isAnimating = false;
      if (this.currentStep > this.lastStepCount) {
        this.resetScroll();
        this.isEnd = false;
        this.currentStep = 0;
        const yOffset = document.querySelector(".highlights").offsetTop + 150;

        const end = gsap.timeline({ paused: true });
        end.add(
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: yOffset },
            opacity: 1,
            ease: Back.linear,
            onComplete: () => {
              this.isScrollingAutomatically = false;
            }
          })
        );
        end.restart();
      }
    });
    this.nowTimeline = tl;
  }

  reverseTimeline(tl) {
    this.isAnimating = true;
    this.disableScroll();
    this.classNameChange();
    tl.reverse().eventCallback("onReverseComplete", () => {
      this.enableScroll();
      this.isAnimating = false;
      if (this.currentStep < 1) {
        this.resetScroll();
        const yOffset = document.querySelector(".highlights").offsetTop - 150;
        const end = gsap.timeline({ paused: true });
        end.add(
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { y: yOffset },
            ease: "power1.inOut",
            onComplete: () => {
              this.isScrollingAutomatically = false;
            }
          })
        );
        end.restart();
      }
    });
  }

  handleScroll(e) {
    let swipeUp = e.type === "wheel" && e.deltaY > 0;
    if (e.type === "touchend") {
      const diffY = e.changedTouches[0].clientY - this.startY;
      if (Math.abs(diffY) > 100) {
        swipeUp = diffY < 0;
      } else return;
    }

    if (this.isAnimating) return;
    if (swipeUp) {
      switch (this.currentStep) {
        case 1:
          this.runTimeline(this.timeline1);
          this.currentStep++;
          break;
        case 2:
          this.runTimeline(this.timeline2);
          this.currentStep++;
          break;
        case 3:
          this.buttonGroup.style.visibility = "hidden";
          this.runTimeline(this.timeline3);
          this.currentStep++;
          break;
        case 4:
          this.runTimeline(this.timeline4);
          this.currentStep++;
          break;
        case 5:
          this.runTimeline(this.timeline5);
          this.currentStep++;
          break;
        case 6:
          this.runTimeline(this.timeline6);
          this.currentStep++;
          break;
        case 7:
          this.runTimeline(this.timeline7);
          this.currentStep++;
          break;
        case 8:
          this.runTimeline(this.timeline8);
          this.currentStep++;
          break;
        case 9:
          this.runTimeline(this.timeline9);
          this.currentStep++;
          break;
      }
    } else {
      switch (this.currentStep) {
        case 10:
          this.currentStep--;
          this.reverseTimeline(this.timeline9);
          break;
        case 9:
          this.currentStep--;
          this.reverseTimeline(this.timeline8);
          break;
        case 8:
          this.currentStep--;
          this.reverseTimeline(this.timeline7);
          break;
        case 7:
          this.currentStep--;
          this.reverseTimeline(this.timeline6);
          break;
        case 6:
          this.currentStep--;
          this.reverseTimeline(this.timeline5);
          break;
        case 5:
          this.currentStep--;
          this.reverseTimeline(this.timeline4);
          break;
        case 4:
          this.currentStep--;
          this.reverseTimeline(this.timeline3);
          break;
        case 3:
          this.currentStep--;
          this.reverseTimeline(this.timeline2);
          break;
        case 2:
          this.currentStep--;
          this.reverseTimeline(this.timeline1);
          break;
        case 1:
          this.currentStep--;
          this.reverseTimeline(this.timeline);
          break;
      }
    }
  }
}

// 230911 header height 변경값에 따라 img 위치값 변경
function ChangeImgTop() {
  const windowWidth = window.innerWidth; // window width
  const $header = document.querySelector(".hmj-header");
  const $partCar = document.querySelector("#part-car");
  const $highlights = document.querySelector(".highlights");
  const headerHeight = $header.offsetHeight;
  const menuHeight = document.querySelector("#menuWrap").offsetHeight;
  let totalHeader = headerHeight + menuHeight;

  if (windowWidth <= 1119) {
    // mo
    if ($header.classList.contains("scr-chk")) {
      // one line header
      $partCar.style.setProperty(
        "--mo-height1",
        "calc(45% - " + menuHeight + "px)"
      );
      $highlights.style.setProperty(
        "--mo-transform",
        "translateY(" + menuHeight + "px)"
      );
      $partCar.style.setProperty(
        "--mo-height2",
        "calc(55% - " + menuHeight + "px)"
      );
    } else {
      // two line header
      $partCar.style.setProperty(
        "--mo-height1",
        "calc(45% - " + totalHeader + "px)"
      );
      $highlights.style.setProperty(
        "--mo-transform",
        "translateY(" + totalHeader + "px)"
      );
      $partCar.style.setProperty(
        "--mo-height2",
        "calc(55% - " + totalHeader + "px)"
      );
    }
  } else {
    // pc
    if ($header.classList.contains("scr-chk")) {
      // one line header
      $partCar.style.setProperty(
        "--pc-height",
        "calc(100vh - " + menuHeight + "px)"
      );
      $partCar.style.setProperty("--pc-top", menuHeight + "px");
    } else {
      // two line header
      $partCar.style.setProperty(
        "--pc-height",
        "calc(100vh - " + totalHeader + "px)"
      );
      $partCar.style.setProperty("--pc-top", totalHeader + "px");
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  new ParallaxAnimation();
  ChangeImgTop();
});
document.addEventListener("scroll", function() {
  ChangeImgTop();
});
