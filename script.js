$(document).ready(function() {
  function square() {
    this.item = "";
    this.location = 0;
  }

  var board = [
    new square(), new square(), new square(),
    new square(), new square(), new square(),
    new square(), new square(), new square()
  ]

  var turn = "x";
  var turnCount = 0;
  var gameOver = false;

  function render() {
    for (var count = 0; count < board.length; count ++) {
      $(".board").append('<div class="square" id="' + count + '"></div>');
    }
  }
  render();

  $(".square").click(function(event) {

    if (gameOver == false) {
      var currentSquare = board[event.target.id];

      if ($(this).is(':empty')) {
        turnCount++;

        //update board's square's location
        currentSquare.location = event.target.id;

        //write player symbol to board
        if (turn == "x") {
          currentSquare.item = "x";
          turn = "o";
        }
        else {
          currentSquare.item = "o";
          turn = "x";
        }
        $(this).append("<p class='color-"+currentSquare.item+"'>"+currentSquare.item+"</p>");
      }

      var win = gameCleared();

      //end game
      if (turnCount == 9 || win == "x won" || win == "o won") {
        if (turnCount == 9) {
          $(".board").append('<p>Tie Game!</p>');
        }
        if (win == "x won") {
          $(".board").append('<p>X Wins!</p>');
        }
        if (win == "o won") {
          $(".board").append('<p>O Wins!</p>');
        }

        gameOver = true;
        $(".board").append('<button class="clear-board">Clear Board</button>')
        $(".clear-board").click(function() {
          window.location.reload();
        });

      }

    }
  });

  function gameCleared() {
    var x_locations = [];
    var o_locations = [];
    var winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    var xWinCount = 0;
    var oWinCount = 0;

    for (var count = 0; count < 9; count++) {
      if (board[count].item == "x") {
        x_locations.push(board[count].location);
      }
      if (board[count].item == "o") {
        o_locations.push(board[count].location);
      }

    }

    for (var i = 0; i < winConditions.length; i++) {

      for (var ix = 0; ix < x_locations.length; ix++) {
        if ($.inArray(parseInt(x_locations[ix]), winConditions[i]) > -1) {
           xWinCount++;
        }
      }
      for (var io = 0; io < o_locations.length; io++) {
        if ($.inArray(parseInt(o_locations[io]), winConditions[i]) > -1) {
          oWinCount++;
        }
      }

      if (xWinCount == 3) {
        return "x won";
      }
      if (oWinCount == 3) {
        return "o won";
      }

      xWinCount = 0;
      oWinCount = 0;
    }

    return "";
  }

});
