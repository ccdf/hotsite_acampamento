var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var video = {'videoId': '9c5j1-L-cag', 'startSeconds': 0, 'suggestedQuality': 'hd1080'}
function onYouTubeIframeAPIReady() {
  player = new YT.Player('videobg', {
    height: '400px',
    playerVars: {
              autoplay: 1,
              loop: 1,
              rel: 0,
              controls: 0,
              showinfo: 0,
              showsearch : 0,
              modestbranding: 0,
              playlist: '9c5j1-L-cag',
              disablekb: 1
          },
    endSeconds: 10,

    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
  player.loadVideoById(video);
  player.setLoop(true);
  player.mute();
}

var done = false;
function onPlayerStateChange(e) {
  if (e.data === YT.PlayerState.ENDED) {
    player.playVideo();
  } else if(e.data === YT.PlayerState.PLAYING) {
    $('.video-container').show();
    setTimeout(function(){
      player.seekTo(142);
    }, 129000);
  }
}

function vidRescale(){

  var w = $(window).width(),
    h = $(window).height();

  if (w/h > 16/9){
    player.setSize(w, w/16*9);
    $('#videobg iframe').css({'left': '0px'});
  } else {
    player.setSize(h/9*16, h);
    $('#videobg iframe').css({'left': -($('#videobg').outerWidth()-w)/2});
  }
}

function stopVideo() {
  player.stopVideo();
}

$('#myCarousel').carousel({
  interval: 10000
})

$('.carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  }
  else {
    $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});

$(window).on('load resize', function(){
  vidRescale();
});

$(document).ready(function(){
  $('.gallery .person .photo').each(function(){
    if ($(this).data('src')) {
      $(this).css('background-image', 'url("'+$(this).data('src')+'")');
    }
  });

  if ($(window).width() > 768) {
    $('.gallery .person .data').each(function(){
      parenth = $(this).parent().height();
      childh = $(this).height();

      $(this).css('margin-top', (parenth-childh)/2);
    });
  }
});
