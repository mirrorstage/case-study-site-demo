$(document).ready(function() {
  $('.header nav a').smoothScroll();
});

(function() {

  var docElem = window.document.documentElement, didScroll, scrollPosition;

  // trick to prevent scrolling when opening/closing button
  function noScrollFn() {
    window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
  }

  function noScroll() {
    window.removeEventListener( 'scroll', scrollHandler );
    window.addEventListener( 'scroll', noScrollFn );
  }

  function scrollFn() {
    window.addEventListener( 'scroll', scrollHandler );
  }

  function canScroll() {
    window.removeEventListener( 'scroll', noScrollFn );
    scrollFn();
  }

  function scrollHandler() {
    if( !didScroll ) {
      didScroll = true;
      setTimeout( function() { scrollPage(); }, 60 );
    }
  };

  function scrollPage() {
    scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
    didScroll = false;
  };

  scrollFn();

  [].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
  new UIMorphingButton( bttn, {
    closeEl : '.icon-close',
    onBeforeOpen : function() {
      noScroll();
    },
    onAfterOpen : function() {
      canScroll();
      classie.addClass( document.body, 'noscroll' );
      classie.addClass( bttn, 'scroll' );
    },
    onBeforeClose : function() {
      classie.removeClass( document.body, 'noscroll' );
      classie.removeClass( bttn, 'scroll' );
      noScroll();
    },
    onAfterClose : function() {
      canScroll();
    }
  } );
} );

})();


$('#work .content-box').on('click', function(event){
  event.stopPropagation();

  var nbrArticles = $('.content-box').length;
  var clickedArticle = $(this);
  var thisIndex = $(this).index();
  var clickedArticleNext = $(this).next('.content-box');
  var clickedArticlePrev = $(this).prev('.content-box');

  console.log('The article : ');
  console.log(clickedArticle);

  articleLink = clickedArticle.data('article');
  articleImage = clickedArticle.data('article');
  articleData = $('#article-contents').find('.article-html[data-article="'+articleLink+'"]').html();
  articleTitle = clickedArticle.find('.description h3').text();
  // projectWebsite = clickedArticle.data('website');
  i = clickedArticle.index()+1;
  var n=1;



  changeArticle();




 function changeArticle() {

    $('.project-container').hide();

    $('.project-view .project-article-header').css({
      'background' : 'url(app/images/'+articleImage+'-main.jpg) no-repeat center'
    });

    $('.project-view .project-article-content').html('<div class="appended-data">'+articleData+'</div>');
    $('.project-article-header').html('<div class="project-article-title"><h1>'+articleTitle+'</h1></div>');

    // $('.view-project a').attr('href', projectWebsite);

    $('.project-container').fadeIn(500);
 }

  if(!$('body').hasClass('article-opened')){

    $('body').addClass('article-opened');

  } else {

    $('body').removeClass('article-opened');

  }

});

$('.project-view').on('click', function(event){
  event.stopPropagation();
});


$('.close-button').on('click', function(){
  $('.project-view').scrollTop(0);
  $('body').removeClass('article-opened');
  var i = 0;
});

// start experimental 1

$(document).keydown(function(e){
  if (e.keyCode === 27 ){
    $('body').removeClass('article-opened');
    $('.project-view').scrollTop(0);
  }
});

// end experimental 1