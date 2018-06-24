//chuck norris ajax request working
let queryURL = "https://api.chucknorris.io/jokes/random"

//initialize firebase
// Initialize Firebase
/*var config = {
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
*/

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

let storageArray = []
var oldItems = JSON.parse(localStorage.getItem('classList')) || []

let smallestInt = []
let smallIntObj = []
let nearestClass
//let indexNumber = 0


$(document).ready(function(){
  let x = $('<div class="panel-body"></div>')

  let y = $('<div class="panel-heading"></div>')
    //loop through oldItems and display a bootstrap panel w class Name
    for(let i = 0; i < oldItems.length; i++){
      $('#classDiv').append(oldItems[i].name + '<br>')
      x.html((oldItems[i].name))
    }
//  console.log(nowThenMinutes())

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
  //  console.log('click works')
    $('#myModal').modal()
  })

  $('#classSubmit').on('click', function(){
    //grab user input date
    let classDate = $('#inputTime').val()
  //  console.log('class date ' + classDate)
    console.log(nowThenMinutes(classDate))
    let minutesTo = nowThenMinutes(classDate)

    newClass = new Class($('#inputClass').val(), $('#inputTime').val(),
      $('#inputDay').val(), $('#inputAddress').val())

    newClass.minutes = minutesTo

      //console.log(newClass)
      //classesArray.push(newClass)
      //display new class in bootstrap panel

    displayClass(newClass)

    loopThroughLocal()

    //erase all previous values from form
    $('#inputClass').val('')
    $('#inputTime').val(''),
    $('#inputDay').val(''),
    $('#inputAddress').val('')
    //let newName = $('#inputClass').val()

      //close the modal
      $('#myModal').modal()

    //findClass(newClass)
  })

  function loopThroughLocal(){
    //places all negative numbers in smallIntObj
    smallestInt = []
    for(let i = 0; i < oldItems.length; i++){

    //  console.log('old items ' + JSON.stringify(oldItems[i].minutes))
    //  console.log('typeof ' + typeof oldItems)
    if(Math.sign(oldItems[i].minutes) == -1){
      smallestInt.push(oldItems[i].minutes)
    }
    else{
      smallestInt.push(-10000)

    }
/*    if(Math.sign(oldItems[i].minutes) == -1){
    console.log('negative, time has not come yet')
    //  let smallIntObj = [i, oldItems[i].minutes]
    smallIntObj.push(oldItems[i].minutes)

    //  smallIntObj.push({i: oldItems[i].minutes})


    }else if (Math.sign(oldItems[i].minutes) == 1){
     console.log('positive')
    }else{
      console.log('0')
    }*/
    }

    //console.log('smallestInt ' + JSON.stringify(oldItems))
    console.log(smallestInt)
    //console.log(JSON.stringify(oldItems))
    console.log(oldItems)
  //  console.log(smallIntObj.indexOf(Math.max(...smallestInt)))
    //let indexOfSmallInt = smallIntObj.indexOf(Math.max(...smallestInt))
    let smallIntIndex = smallestInt.indexOf(Math.max(...smallestInt))
  //  console.log('indexOfSmallInt ' + smallIntObj.indexOf(Math.max(...smallestInt)))
    //console.log('indexOfSmallInt ' + indexOfSmallInt)
    console.log('smallIntIndex ' + smallIntIndex)
    if(smallIntIndex != -1){
      //let nearestClass = oldItems[indexOfSmallInt].name
      nearestClass = oldItems[smallIntIndex].name
      console.log('nearest class is ' + nearestClass)
    //  console.log(Math.max(...smallestInt) )
    }

    //find smallest int in smallestInt array

  }

  //function to add div with class informatin
  function displayClass(classObject){
  //console.log('function hit ' + JSON.stringify(classObject.name))
  //first push the classObject into an classArray
//  storageArray.push(classObject)
  //localStorage.setItem('classList', JSON.stringify(storageArray))

  //console.log(typeof oldItems)
  oldItems.push(classObject)
//  console.log('old items ' + JSON.stringify(oldItems))
  localStorage.setItem('classList', JSON.stringify(oldItems))

  //console.log('old Items ' + JSON.stringify(oldItems))
  //console.log(oldItems.length)
  let x = $('<div class="panel-body"></div>')

  let y = $('<div class="panel-heading"></div>')

  $('#classDiv').empty()
    //loop through oldItems and display a bootstrap panel w class Name
    console.log('old items ' + oldItems)
    for(let i = 0; i < oldItems.length; i++){
      $('#classDiv').append(oldItems[i].name + '<br>')
      x.html((oldItems[i].name))
      //console.log(oldItems[i].name)
      //x.html(oldItems[i].name)
    //  console.log('x ' + x)
      //y.append(x)


    }



    //$('#classDiv')
  }

  //function to calculate the number of minutes between now and next class
  function nowThenMinutes(z){
    //code below formats todays date
    let year = moment().format('YY')
    let month = moment().format('MM')
    let day = moment().format('DD')
    let dateString = (month + '/' + day + '/' + year)


  //  console.log(year + month + day)
    let x = moment().format('MMM Do YY')
    //let y = moment().diff().fromNow().format('m')
    let y = moment().diff(moment(dateString + ' ' + z), 'minutes')
    //let y = moment(x, '23:00:00').diff(moment()).format('m')
  //  console.log('y is ' + y)
    return y
  }

  //make a function that gets localStorage array to loop through
  function findClass(addedClass){
  //  storageArray = JSON.parse(localStorage.getItem())
    //storageArray = localStorage.getItem('classArray')
    //let oldClass = JSON.parse(localStorage.getItem('classList'))
    //oldClass.push(addedClass)
    //storageArray.push(addedClass)
    //console.log(oldClass)
    //add storageArray to localStorage
    //let classList = JSON.parse(localStorage.getItem('classList'))
  //  localStorage.setItem('classList', JSON.stringify(oldClass))
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
