$(document).ready(function() {
  //* Create a list that holds all of your cards
  // */

  var move = 0;
  var symbols = ['diamond', 'diamond', 'plane', 'plane', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
  var cardHolder = $('.deck');
  var card = $('.card');
  var icons = $('li.card i');
  var $moves = parseInt($("span").text(0));
  var $ratingStars = $('.stars').find('i');
  var match = 0;
  var sec = 0;



  function initGame() {
    $ratingStars.removeClass('fa-star-o').addClass('fa-star');

    starCounter();
  }
$('.deck').one('click', function startCounter() {

  function pad(val) {
    return val > 9 ? val : "0" + val;
  }
  setInterval(function() {
    $("#seconds").html(pad(++sec % 60));
    $("#minutes").html(pad(parseInt(sec / 60, 10)+ ' :'));
  }, 1000);
  return sec

});


  function stopCounter() {
    clearInterval(function() {
      $("#seconds").html(pad(++sec % 60));
      $("#minutes").html(pad(parseInt(sec / 60, 10)+ ' :'));
    }, 1000);
    return sec;
  }


  //
  // Display the cards on the page
  //  - shuffle the list of cards using the provided "shuffle" method below
  shuffle(symbols);
  //  - loop through each card and create its HTML

  for (var i = 0; i < symbols.length; i++) {
    cardHolder.append('<li class="card"><i class="fa fa-' + symbols[i] + '"></i></li>');
    //  - add each card's HTML to the page
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



  //  set up the event listener for a card. If a card is clicked:
  $('.card').on('click', cardClick);


  var openedCards = [];
  //- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  function cardClick(e) {
    e.preventDefault();
    var target = e.currentTarget;
    $(e.target).addClass('open show');
    openedCards.push(target);
    matchOrNot(openedCards);
    return openedCards;
  }

  //- if the list already has another card, check to see if the two cards match
  function matchOrNot(array) {
    for (var i = 1; i < array.length; i++) {
      var item1 = array[0];
      var item2 = array[1];
      if (array.length > 1 && (item1.lastChild.classList.value === item2.lastChild.classList.value)) {
        ifCardsMatch();
      } else {

        setTimeout(ifCardsDontMatch, 500);
        return false;
      }
    }
  }



  //   //+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

  function ifCardsMatch() {
    openedCards.forEach(function(items) {
      items.className += ' match';
      openedCards = [];
      match++;
      if (match === 16) {
        setTimeout(gameOver(), 1000);
      }

    });
    incrementCounter();
  }

  //   //+ if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

  function ifCardsDontMatch() {
    openedCards = [];
    $('.card').removeClass('open show');
    //console.log("Not matching");
    incrementCounter();
  }

  //   //+ increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  function incrementCounter() {
    move++;
    // var value = parseInt($(".moves").text(), 10) + 1;
    $(".moves").text(move);
    starCounter(move);
  }


  function starCounter(move) {
    if (move > 20) {
      $('.stars').find('i').eq(2).removeClass('fa-star').addClass('fa-star-o');

    }

    if (move > 20) {
      $('.stars').find('i').eq(1).removeClass('fa-star').addClass('fa-star-o');


    }
  }





  //   //+ if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  function gameOver() {

    var rating;
    $('.deck').hide();
    if (move > 8 || seconds < 25) {
      rating = 1;

    } else if (move > 14 || seconds < 50) {
      rating = 2;


    } else if (move > 20 || seconds < 100) {
      rating = 3;

    }

    confirm('You completed the game.\n You won thw game with  ' + move + 'steps. \n in ' + sec.toFixed() + ' seconds. \n Your rating is ' + rating + '\n Do you want to play again?')

    if (true) {
      location.reload();
      clearInterval(counter);

    } else {
      alert("Thank you for playing");
      $('.container').hide();
    }

    stopCounter();
  }


  $('.restart').click(function() {
    location.reload();
  });

  initGame();

});
