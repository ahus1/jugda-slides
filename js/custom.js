function resizeLotteryInput(shrink) {
  var text = document.getElementsByTagName("textarea")[0];
  // text.setAttribute("rows", shrink ? "1" : "10");
  // text.setAttribute("cols", shrink ? "1" : "80");
}

remark.macros.scale = function (percentage) {
  var url = this;
  return '<img src="' + url + '" style="width: ' + percentage + '" />';
};

var slideshow = remark.create({
  sourceUrl: 'slides.md'
});

function enableAutoSlideshow(id, interval) {
  var timer;
  document.getElementById(id).onclick=function(e){
    if(!e.target.checked) {
      clearInterval(timer);
    } else {
      timer = setInterval(function(){
        if (slideshow.getCurrentSlideIndex() + 1 < slideshow.getSlideCount()) {
          slideshow.gotoNextSlide();
        } else {
          slideshow.gotoFirstSlide();
        }
      }, interval);
    }
  }
}

enableAutoSlideshow("autoSlideshow", 5000);

var players = document.getElementById("attendees").value.split("\n");

document.getElementById('showAttendees').onclick=function(e){
  if(!e.target.checked) {
    document.getElementById('attendees').style.display = 'none';
  } else {
    document.getElementById('attendees').style.display = 'block';
  }
}

function nextWinner() {
  if (players.length < 1) {
    document.getElementById('winner').innerHTML = "Teilnehmer-Liste ist leer!";
    return;
  }
  var winner = Math.floor(Math.random() * players.length);
  document.getElementById('winner').innerHTML = players[winner];
  players.splice(winner, 1);
}

function resetLottery() {
  document.getElementById('winner').innerHTML = '';
  players = document.getElementById("attendees").value.split("\n");
}

slideshow.on('showSlide', function (slide) {
  resetLottery();
});
