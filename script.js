//chuck norris ajax request working
let queryURL = "https://api.chucknorris.io/jokes/random"

//initialize firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMCrH7br_SIkS-3tzjY7HIyM-uo9ZV3a0",
  authDomain: "where-s-my-class.firebaseapp.com",
  databaseURL: "https://where-s-my-class.firebaseio.com",
  projectId: "where-s-my-class",
  storageBucket: "",
  messagingSenderId: "703520992210"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

//create a constructor for a class
function Class(name, time, day, address){
  this.name = name;
  this.time = time;
  this.day = day;
  this.address = address;
}

//create an array for all of the classes
let classesArray = []
let newClass

$(document).ready(function(){
  nowThenMinutes()

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

  $('#classSubmit').on('click', function(){
    //create new class object

    //erase all previous values from form
    $('#inputClass').val('')
    $('#inputTime').val(''),
    $('#inputDay').val(''),
    $('#inputAddress').val('')
    //let newName = $('#inputClass').val()
    newClass = new Class($('#inputClass').val(), $('#inputTime').val(),
      $('#inputDay').val(), $('#inputAddress').val())

      console.log(newClass)
      //classesArray.push(newClass)
      //display new class in bootstrap panel
      displayClass(newClass)

      //close the modal
      $('#myModal').modal()
  })

  //function to add div with class informatin
  function displayClass(classObject){
    console.log('function hit ' + JSON.stringify(classObject))
    let x = $('<div class="panel-body"></div>')
    x.html(classObject.name)
    let y = $('<div class="panel-heading"></div>')
    y.append(x)

    $('#classDiv').append(y)
    //$('#classDiv')
  }

  //function to calculate the number of minutes between now and next class
  function nowThenMinutes(){
    let year = moment().format('YY')
    let month = moment().format('MM')
    let day = moment().format('DD')
    let dateString = (month + '/' + day + '/' + year)
  //  console.log(year + month + day)
    let x = moment().format('MMM Do YY')
    //let y = moment().diff().fromNow().format('m')
    let y = moment().diff(moment(dateString + ' 23:00:00'), 'minutes')
    //let y = moment(x, '23:00:00').diff(moment()).format('m')
    console.log('y is ' + y)

  }


  /*$('#classSubmit').on('click', function(){
    //alert('button works')
    //create a class object

    let newClass = {
      name: $('#inputClass').val(),
      time: $('#inputTime').val(),
      day: $('#inputDay').val(),
      address: $('#inputAddress').val()
    }

    // Code for handling the push
    database.ref().push({
      name: newClass.name,
      time: newClass.time,
      day: newClass.day ,
      address: newClass.address
    });

    //firebase listener
    database.ref().on("child_added", function(snapshot) {
      // Log everything that's coming out of snapshot
      //console.log(snapshot.val());

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  })*/


})
