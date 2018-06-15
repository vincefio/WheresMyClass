//chuck norris ajax request working
let queryURL = "https://api.chucknorris.io/jokes/random"

$(document).ready(function(){
  $('#smileButton').on('click', function(event){
    event.preventDefault()

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response){
      //console.log(response.value)
      responsiveVoice.speak(response.value)
      $('#joke').html(response.value)
    })
  })

  $('#classModal').on('click', function(){
    console.log('click works')
    $('#myModal').modal()
  })

  


})
