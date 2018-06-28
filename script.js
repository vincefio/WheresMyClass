//chuck norris ajax request working
let queryURL = "https://api.chucknorris.io/jokes/random"


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
let nearestClassTime

let classDate
let minutesTo
//let indexNumber = 0

//google maps stuff
/*let map;
  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    console.log
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }*/
/*  var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });

      }*/

      /*function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }*/
  var directionsService
  var directionsDisplay
  function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom:7,
    center: chicago
  }
infoWindow = new google.maps.InfoWindow;


  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
}
function getLat(){

}

function calcRoute() {
  // Try HTML5 geolocation.
  var pos
  let latitude
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log(pos.lat)
      latitude = pos.lat
    /*  infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);*/
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  console.log('lat is '+ latitude)
  var myLatLng = new google.maps.LatLng({lat: -34, lng: 151});
  console.log('latlng ' + myLatLng)
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}

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

  $('#nextClassButton').on('click', function(){
    console.log('next class button')
    loopThroughLocal()
    let x = $('<h3>')
    x.html('Youre next class is ' + nearestClass + ' at ' + nearestClassTime)

    let y = $('<h4>')
    y.html('Would You Like Directions to Class?')

    let z = $('<button type="button" class="btn btn-success answerButton" id="yesButton">Yes</button>')
    let a = $('<button type="button" class="btn btn-danger answerButton" id="noButton">No</button>')
    $('#nextClassDiv').append(x).append(y).append(z).append(a)
  })

  $('#classModal').on('click', function(){
  //  console.log('click works')
    $('#myModal').modal()
  })

  //my api key:
  //AIzaSyCvMR70NsNiSJtm-UGdnZQ0p5Ryl8mu2Zw
  $(document).on('click', '#yesButton', function(){
    console.log('yes works')

  })

  $(document).on('click', '#noButton', function(){
    console.log('no works')
    $('#nextClassDiv').empty()
  })

  $('#classSubmit').on('click', function(){
    //grab user input date
    classDate = $('#inputTime').val()
  //  console.log('class date ' + classDate)
    console.log(nowThenMinutes(classDate))
    minutesTo = nowThenMinutes(classDate)

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
      nearestClassTime = oldItems[smallIntIndex].time
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

})
