$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function initializeApp() {
    addEventListeners();
    shuffleCards();
    display_stats();
}

function addEventListeners() {
    $('#game-area').on('click', '.card', card_clicked);
    $('.reset').on('click', resetButtonClicked);
}

function card_clicked() {
    if ($(this).find('.back').css('display') !== "none") {
        $(this).find('.back').css('display', "none");
        if (first_card_clicked === null) {
            first_card_clicked = $(this);
            $(this).toggleClass("not_hover");
        } else {
            attempts++;
            second_card_clicked = $(this);
            $(this).toggleClass("not_hover");
            var firstAndSecondCardAreMatched = checkForPossibleCardsMatch(first_card_clicked, second_card_clicked);
            if (firstAndSecondCardAreMatched) {
                actionToTakeWhenCardsAreMatched();
            } else {
                $('#game-area').off('click', '.card', card_clicked);
                setTimeout(flipUnmatchedCardBack, 2000);
            }
            display_stats();
        }
    }
}

function actionToTakeWhenCardsAreMatched() {
    matches++;
    match_counter++;
    resetFirstAndSecondCardClickedValue();
    var allCardsAreMatched = checkForAllCardsMatch();
    if (allCardsAreMatched) {
        displayWinningMessage("You Have Won!");
    }
}

function flipUnmatchedCardBack() {
    $('#game-area').on('click', '.card', card_clicked);
    first_card_clicked.find('.back').css('display', 'initial');
    second_card_clicked.find('.back').css('display', 'initial');
    first_card_clicked.toggleClass("not_hover");
    second_card_clicked.toggleClass("not_hover");
    resetFirstAndSecondCardClickedValue();
}

function checkForPossibleCardsMatch(first_card_clicked, second_card_clicked) {
    return first_card_clicked.find(".front").attr("src") === second_card_clicked.find(".front").attr("src");

}

function checkForAllCardsMatch() {
    return match_counter === total_possible_matches;
}

function displayWinningMessage(message) {
    $('.winning-message').text(message);
}

function resetFirstAndSecondCardClickedValue() {
    first_card_clicked = null;
    second_card_clicked = null;
}

function display_stats() {
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    if (attempts !== 0) {
        accuracy = 100*matches/attempts;
    }
    accuracy = accuracy.toFixed(2) + "%";
    $(".accuracy .value").text(accuracy);
}

function reset_stats() {
    matches = 0;
    attempts = 0;
    accuracy = 0;
    display_stats();
}

function resetButtonClicked() {
    games_played++;
    first_card_clicked = null;
    second_card_clicked = null;
    match_counter = 0;
    reset_stats();
    $(".card .back").css("display", "initial");
    displayWinningMessage("");
    shuffleCards();
    resetCardsHoverEffects();
}

function shuffleCards() {
    var arrayOfCards = $('#game-area .card').toArray();
    $('#game-area .card').remove();
    var temp, randomIndex;
    for (var i = arrayOfCards.length - 1; i >= 0; i--) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        temp = arrayOfCards[i];
        arrayOfCards[i] = arrayOfCards[randomIndex];
        arrayOfCards[randomIndex] = temp;
        $('#game-area').append(arrayOfCards[i]);
    }
}

function resetCardsHoverEffects() {
    var numberOfCards = $('#game-area .card').toArray();
    $('#game-area .card').remove();
    for (var index = 0; index < numberOfCards.length; index++) {
        if ($(numberOfCards[index]).hasClass("not_hover")) {
            $(numberOfCards[index]).toggleClass("not_hover");
        }
        $('#game-area').append(numberOfCards[index]);
    }
}