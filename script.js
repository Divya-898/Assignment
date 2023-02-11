
$(document).ready(function () {
	let index = 0;
const totalWorkItems = $(".work-item").length;

  $(window).on("load", function () {
    $(".preloader").addClass("loaded");
  });

  $(".nav-toggle").click(function () {
    $(".header .nav").toggle();
  });

  $(".header .nav a").click(function () {
    if ($(window).width() < 768) {
      $(".header .nav").slideToggle();
    }
  });
  //
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });
  $("a").on("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      var hash = this.hash;
      $("html,body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  $(".lightbox").hide();
  $(".work-item-inner").click(function () {
    index = $(this).parent(".work-item").index();
    $(".lightbox").show();
    lightboxSlideShow();
  });

  $(".lightbox .prev").click(function () {
    if (index == 0) {
      index = totalWorkItems - 1;
    } else {
      index--;
    }
    lightboxSlideShow();
  });

  $(".lightbox .next").click(function () {
    if (index == totalWorkItems - 1) {
      index = 0;
    } else {
      index++;
    }
    lightboxSlideShow();
  });

  $(".lightbox-close").click(function () {
    $(".lightbox").hide();
  });
  $(".lightbox").click(function (e) {
    if ($(e.target).hasClass(".lightbox")) {
      $(this).removeClass("open");
    }
  });

  function lightboxSlideShow() {
    const imgSrc = $(".work-item").eq(index).find("img").attr("src");
    const category = $(".work-item").eq(index).find("h4").html();
    $(".lightbox-img").attr("src", imgSrc);
    $(".lightbox-category").html(category);
    console.log(
      $(".lightbox-counter").html(totalWorkItems + "/" + (index + 1))
    );
  }
});
