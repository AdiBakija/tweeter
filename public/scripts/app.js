/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Helper function to render tweet list
  function renderTweets(tweets) {
    // loops through tweets
    for (index of tweets) {
      // calls createTweetElement for each tweet
      var $tweet = createTweetElement(index);
      // takes return value of createTweetElement and appends it to the
      // tweets container
      $('#tweets-container').append($tweet);
    }

  };

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Helper function that constructs NEW tweet elements based on DOM.
  function createTweetElement (tweetData) {
    // Note the use of template literals in combination with HTML
   return `
      <article class="tweet">
        <header>
          <img src=${tweetData.user.avatars.small}>
          <span class="name">${tweetData.user.name}</span>
          <span class="handle">${tweetData.user.handle}</span>
        </header>
        <p class="tweetbody">${escape(tweetData.content.text)}</p>
        <footer>
          <span class="posted">${tweetData.created_at}</span>
          <span class="icons">
            <ion-icon name="flag"></ion-icon>
            <ion-icon name="repeat"></ion-icon>
            <ion-icon name="heart"></ion-icon>
          </span>
        </footer>
      </article>
      `;

  };

  // Function to load the list of all tweets inside of the /tweets database.
  // The loaded tweets are sorted as they're rendered.
  function loadTweets () {

    $.getJSON( "/tweets/", function (data) {
      $( "#tweets-container" ).empty()
      renderTweets(data.sort( function(a,b){
      return b.created_at - a.created_at;
      }));

    });

  };

  // Submit form handler for post requests
  $("#submit-tweet").submit(function(event) {
    // Check to see that the submit went through
    console.log("Handler for .submit() called.");
    // Prevent the submit buttons default properties from occurring.
    event.preventDefault();
    var $text = $('.tweetinput').val();
    var $charLen = $text.length
    //Serialized data.  Should return "text=<whatever was typed>" if console logged.
    var $serialized = $(this).serialize();

    // Error message handler
    var $errorMessage = $('.error-message');


    if ($text === "") {
      //Slides error message down and displays text.
      $errorMessage.slideUp();
      $errorMessage.slideDown().text("Nothing entered.  Please enter a tweet.");
    } else if ($charLen > 140) {
      $errorMessage.slideUp();
      $errorMessage.slideDown().text("You have reached the character limit.");
    } else {
      // Post to serialized data to the /tweets/ URL and hides error message.
      $errorMessage.slideUp();
      $.post("/tweets/", $serialized)
      .then(function() {loadTweets()});
    }

  });

  // Compose button handler which slides the tweet text area up and down upon click.
  // If the tweet text area is hidden, toggle it and focus on the text area.
  // This if statement incorporates IE compatability due to problems with .focus()
  // running on hidden items witin IE.
  var $composeButton = $('.compose');
  $composeButton.click(function (event) {

    if ($('.new-tweet').is(":hidden")) {
      $('.new-tweet').slideToggle();
      $('.tweetinput').focus();
    } else {
      $('.new-tweet').slideToggle();
    }

  });



  //Call load tweets to populate homepage with list of tweets
  loadTweets();

});