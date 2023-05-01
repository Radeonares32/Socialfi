
$( ".user-info" ).click(function() {
        $( ".user-account-settingss" ).slideToggle( "fast");
        $("#message").not($(this).next("#message")).slideUp();
        $("#notification").not($(this).next("#notification")).slideUp();
});
$( ".com" ).click(function() {
       
        $(".comment-section").slideToggle( "fast");
});
$( ".msg-settings-btn" ).click(function() {
      
  $(this).children(".msg-settings").slideToggle( "fast");

});
$( ".usr-msg-settings-btn" ).click(function() {
       
  $(this).children(".usr-msg-settings").slideToggle( "fast");
  
});

$( ".settings-chat" ).click(function() {
       
  $(this).children(".usr-msg-settings").slideToggle( "fast");
  
});
$( ".message-filter" ).click(function() {
       
  $(this).children(".msg-filters").slideToggle( "fast");
  
});
$( ".close-chat" ).click(function() {

  $(".conversation-box").remove();
  
});
$( ".minus-chat" ).click(function() {

  $(".chat-hist").slideToggle( "fast");
  $(".typing-msg").slideToggle( "fast");
  
});
$(".ed-opts-open").on("click", function(){
  $(this).next(".ed-options").toggleClass("active");
  return false;
});
$(".menu-btn > a").on("click", function(){
  $("nav").toggleClass("active");
  return false;
});
$( ".message-overlay .msg-title" ).click(function() {
       
  $(this).parent().children(".message-search").slideToggle( "fast");
  $(this).parent().children(".messages-list").slideToggle( "fast");
  
});

$(document).ready(function() {
  $('#appointment').DataTable({
    "bLengthChange": false,
    "bInfo":false,
    "bPaginate": false,
    "ordering": false,
    "language": {
      "search": "Ara"
    }
  });
} );
$(document).ready(function() {
  $('#network').DataTable({
    "bLengthChange": false,
    "bInfo":false,
    "bPaginate": false,
    "ordering": false,
    "language": {
      "search": "Ara"
    }
  });
} );
$(document).ready(function() {
  $('#partners').DataTable({
    "bLengthChange": false,
    "bInfo":false,
    "bPaginate": false,
    "ordering": false,
    "language": {
      "search": "Ara"
    }
  });
} );
$(document).ready(function() {
  $('#partners1').DataTable({
    "bLengthChange": false,
    "bInfo":false,
    "bPaginate": false,
    "ordering": false,
    "language": {
      "search": "Ara"
    }
  });
} );
$(document).ready(function() {
  $('#partners2').DataTable({
    "bLengthChange": false,
    "bInfo":false,
    "bPaginate": false,
    "ordering": false,
    "language": {
      "search": "Ara"
    }
  });
} );
$(".exp-bx-open").on("click", function(){
  $("#experience-box").addClass("open");
  $(".wrapper").addClass("overlay");
  return false;
});
$(".close-box").on("click", function(){
  $("#experience-box").removeClass("open");
  $(".wrapper").removeClass("overlay");
  return false;
});
$(".cancel").on("click", function(){
  $("#experience-box").removeClass("open");
  $(".wrapper").removeClass("overlay");
  return false;
});


$(".exp-bx-open2").on("click", function(){
  $("#experience-box2").addClass("open");
  $(".wrapper").addClass("overlay");
  return false;
});
$(".close-box").on("click", function(){
  $("#experience-box2").removeClass("open");
  $(".wrapper").removeClass("overlay");
  return false;
});
$(".cancel").on("click", function(){
  $("#experience-box2").removeClass("open");
  $(".wrapper").removeClass("overlay");
  return false;
});

 $('.profiles-slider').slick({
        slidesToShow: 3,
        slck:true,
        slidesToScroll: 1,
        prevArrow:'<span class="slick-previous"></span>',
        nextArrow:'<span class="slick-nexti"></span>',
        autoplay: true,
        dots: false,
        autoplaySpeed: 2000,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
  
      ]


    });
    $('.home-slider').slick({
      slidesToShow: 1,
      slck:true,
      slidesToScroll: 1,
      prevArrow:'<span class="slick-previous"></span>',
      nextArrow:'<span class="slick-nexti"></span>',
      autoplay: true,
      dots: false,
      autoplaySpeed: 2000,
      responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]


  });


    $('.sign-control li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.sign-control li').removeClass('current');
        $('.sign_in_sec').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });



    $('.signup-tab ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.signup-tab ul li').removeClass('current');
        $('.dff-tab').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

 

    $('.tab-feed ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.tab-feed ul li').removeClass('active');
        $('.product-feed-tab').removeClass('current');
        $(this).addClass('active animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });
