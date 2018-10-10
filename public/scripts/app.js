/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets(tweets) {
    // loops through tweets
    for (index of tweets) {
      // calls createTweetElement for each tweet
      var $tweet = createTweetElement(index);
      // takes return value of createTweetElement and appends it to the
      // tweets container
      $('#tweets-container').append($tweet);
    }

  }


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
        <p class="tweetbody">${tweetData.content.text}</p>
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

  }
  // Call renderTweets function and pass raw data (array of objects from above).
  // At some point the data passed will be an actual dynamic database of tweets.
  renderTweets(data);

});