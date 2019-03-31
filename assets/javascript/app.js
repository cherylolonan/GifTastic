$(document).ready(function() {

  var topics = ["Corgi", "Bulldog", "German Shepherd", "Australian Shepherd", "Golden Retriever", "Poodle", "Labrador"];	

  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass('doggos');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

$(document).on('click', '.doggos', function() {

    var doggo = $(this).html();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + doggo + "&api_key=HlDS1rI0ucFzEpGQh8T3gwHv71cETlOK&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        $('#gifs-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url; 

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#gifs-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        var rating = results[j].rating;
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#gifs-view').prepend(displayRated);
  }

});

        function playGif() { 
                    var state = $(this).attr('data-state');
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                }

      });

        $(document).on('click', '#add-doggo', function(){
            if ($('#doggo-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var doggo = $('#doggo-input').val().trim();
            topics.push(doggo);
            $('#doggo-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        });