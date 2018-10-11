// $(document).ready(function() {
//   console.log("The DOM has been loaded");
// });


$('.tweetinput').on('keyup', function() {
  //"this" is just another way of saying the previously selected element, the $ makes
  //it a jQuery  object allowing us to access it's properties.
  let $tweetinput = $(this);
  //Accessed the length of input a user types.
  let $charLength = $tweetinput.val().length;
  let count = 140 - $charLength;
  //Upate counter value to be the true count.
  $tweetinput.siblings('.counter').text(count);

  //If the count is below 0, make the text red
  if (count < 0) {
    $tweetinput.siblings('.counter').text(count).css('color', 'red');
  } else {
    $tweetinput.siblings('.counter').text(count).css('color', '#244751');
  }
});
