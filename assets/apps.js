var savedSearch = document.querySelector('.saved-search');
var searchBtn = document.querySelector(".search");
var liContainer1 = document.querySelector('.list-group1');
var liContainer2 = document.querySelector('.list-group2');
var liContainer3 = document.querySelector('.list-group3');
var liContainer4 = document.querySelector('.list-group4');
var liContainer5 = document.querySelector('.list-group5');
var liContainer6 = document.querySelector('.list-group6');
var cardTitle1 = document.querySelector('.card-body1');
var cardTitle2 = document.querySelector('.card-body2');
var cardTitle3 = document.querySelector('.card-body3');
var cardTitle4 = document.querySelector('.card-body4');
var cardTitle5 = document.querySelector('.card-body5');
var cardTitle6 = document.querySelector('.card-body6');
let firstSearch = document.querySelector('.search-start');
let launchScreen = document.getElementById('launch-screen');
let history = document.getElementById('main-history');
let cards = document.getElementById('main-cards');

var lat;
var lon;
var weatherArr = [];
var searchInfo = [];

firstSearch.addEventListener('click', function(e){
  e.preventDefault();
  let citySearch = document.querySelector('#init-city-search').value;
  searchLatLon(citySearch);
  launchScreen.classList.add('invisible');
  history.classList.remove('invisible');
  cards.classList.remove('invisible');
})

searchBtn.addEventListener("click", function(e){
  e.preventDefault();
  var citySearch = document.querySelector('#city-search').value;
  searchLatLon(citySearch);
});
//function to remove any created information cards so they can be populated with new search info
function clearList(){
  var cardBody = document.querySelectorAll('.card-body');
  var listGroup = document.querySelectorAll('.list-group');

  for (var card of cardBody){
    if(card.querySelector('.card-title')){
    card.querySelector('.card-title').remove();
    card.querySelector('img').remove();
    }
  };
  for (var list of listGroup){
    if(list.querySelector('.list-group-item')){
      var listItems = list.querySelectorAll('.list-group-item');
      for (var item of listItems){
        item.remove();
      }
    }
  }
}

function searchLatLon(city) {
  clearList();
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=5&appid=54af2aadd2e4e94c91bb5c0452485474"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(searchInfo)
      console.log(data);
      //get the latitude and longitude from the city search to perform another api call with
      lat = data[0].lat;
      lon = data[0].lon;
      //puts the information in an array to save to local storage
      var searchInfoEl = {
        city: city,
        lat: lat,
        lon : lon,
      };
      var cityIdentifier = false;
      // console.log(searchInfo[0].city);
      console.log(searchInfoEl);
      for(var i = 0; i < searchInfo.length; i++){
        if (searchInfo[i].city == city){
          cityIdentifier = true;
        }
      }
      if(!cityIdentifier){
      searchInfo.push(searchInfoEl);
      //save the info to local storage
      localStorage.setItem('saved search', JSON.stringify(searchInfo));
      }
    })
    .then(function(){
      fetch(
        //using the lat/lon from previous call get the weather info for the next 5 days
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" + lon +
          "&APPID=54af2aadd2e4e94c91bb5c0452485474&units=imperial"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // arrary values needed = [0,7,15,23,31,39]
          //store the data variables to display for user
          var date = data.list[0].dt;
          var icon = data.list[0].weather[0].icon;
          var temp = data.list[0].main.temp;
          var windSpeed = data.list[0].wind.speed;
          var humidity = data.list[0].main.humidity;
          //convert the unix timestamp into an understandable date, and add it to the Card
          date = (date * 1000);
          var newDate = new Date(date)
          date = newDate.toLocaleDateString();
          //create elements to display the information and append to the document
          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (city + "(" + date + ")");
          cardTitle1.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle1.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
            if(weatherArr[i] == weatherArr[2]){
             liEl.innerText = 'Humidity: ' + weatherArr[i] + '%';
            }else if(weatherArr[i] == weatherArr[1]){
              liEl.innerText = 'Wind: ' + weatherArr[i] + ' MPH';
            }else{
            liEl.innerText = 'Temp: ' + weatherArr[i] + ' Deg F'; }
            liContainer1.appendChild(liEl);
          }
          var date = data.list[7].dt;
          var icon = data.list[7].weather[0].icon;
          var temp = data.list[7].main.temp;
          var windSpeed = data.list[7].wind.speed;
          var humidity = data.list[7].main.humidity;
          //convert the unix timestamp into an understandable date, and add it to the Card
          date = (date * 1000);
          var newDate = new Date(date)
          date = newDate.toLocaleDateString();
          //create elements to display the information and append to the document
          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (city + "(" + date + ")");
          cardTitle2.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle2.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
              if(weatherArr[i] == weatherArr[2]){
                liEl.innerText = 'Humidity: ' + weatherArr[i] + '%';
               }else if(weatherArr[i] == weatherArr[1]){
                 liEl.innerText = 'Wind: ' + weatherArr[i] + ' MPH';
               }else{
               liEl.innerText = 'Temp: ' + weatherArr[i] + ' Deg F'; }
            liContainer2.appendChild(liEl);
          }
          var date = data.list[15].dt;
          var icon = data.list[15].weather[0].icon;
          var temp = data.list[15].main.temp;
          var windSpeed = data.list[15].wind.speed;
          var humidity = data.list[15].main.humidity;
          //convert the unix timestamp into an understandable date, and add it to the Card
          date = (date * 1000);
          var newDate = new Date(date)
          date = newDate.toLocaleDateString();
          //create elements to display the information and append to the document
          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (city + "(" + date + ")");
          cardTitle3.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle3.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
            if(weatherArr[i] == weatherArr[2]){
              liEl.innerText = 'Humidity: ' + weatherArr[i] + '%';
             }else if(weatherArr[i] == weatherArr[1]){
               liEl.innerText = 'Wind: ' + weatherArr[i] + ' MPH';
             }else{
             liEl.innerText = 'Temp: ' + weatherArr[i] + ' Deg F'; }
            liContainer3.appendChild(liEl);
          }
          var date = data.list[23].dt;
          var icon = data.list[23].weather[0].icon;
          var temp = data.list[23].main.temp;
          var windSpeed = data.list[23].wind.speed;
          var humidity = data.list[23].main.humidity;
          //convert the unix timestamp into an understandable date, and add it to the Card
          date = (date * 1000);
          var newDate = new Date(date)
          date = newDate.toLocaleDateString();
          //create elements to display the information and append to the document
          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (city + "(" + date + ")");
          cardTitle4.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle4.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
            if(weatherArr[i] == weatherArr[2]){
              liEl.innerText = 'Humidity: ' + weatherArr[i] + '%';
             }else if(weatherArr[i] == weatherArr[1]){
               liEl.innerText = 'Wind: ' + weatherArr[i] + ' MPH';
             }else{
             liEl.innerText = 'Temp: ' + weatherArr[i] + ' Deg F'; }
            liContainer4.appendChild(liEl);
          }
          var date = data.list[31].dt;
          var icon = data.list[31].weather[0].icon;
          var temp = data.list[31].main.temp;
          var windSpeed = data.list[31].wind.speed;
          var humidity = data.list[31].main.humidity;
          //convert the unix timestamp into an understandable date, and add it to the Card
          date = (date * 1000);
          var newDate = new Date(date)
          date = newDate.toLocaleDateString();
          //create elements to display the information and append to the document
          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (city + "(" + date + ")");
          cardTitle5.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle5.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
            if(weatherArr[i] == weatherArr[2]){
              liEl.innerText = 'Humidity: ' + weatherArr[i] + '%';
             }else if(weatherArr[i] == weatherArr[1]){
               liEl.innerText = 'Wind: ' + weatherArr[i] + ' MPH';
             }else{
             liEl.innerText = 'Temp: ' + weatherArr[i] + ' Deg F'; }
            liContainer5.appendChild(liEl);
          }
          var date = data.list[39].dt;
          var icon = data.list[39].weather[0].icon;
          var temp = data.list[39].main.temp;
          var windSpeed = data.list[39].wind.speed;
          var humidity = data.list[39].main.humidity;
          //convert the unix timestamp into an understandable date, and add it to the Card
          date = (date * 1000);
          var newDate = new Date(date)
          date = newDate.toLocaleDateString();
          //create elements to display the information and append to the document
          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (city + "(" + date + ")");
          cardTitle6.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle6.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
            if(weatherArr[i] == weatherArr[2]){
              liEl.innerText = 'Humidity: ' + weatherArr[i] + '%';
             }else if(weatherArr[i] == weatherArr[1]){
               liEl.innerText = 'Wind: ' + weatherArr[i] + ' MPH';
             }else{
             liEl.innerText = 'Temp: ' + weatherArr[i] + ' Deg F'; }
            liContainer6.appendChild(liEl);
          }
        });
    });
    var savedSearchEl = document.createElement('button');
    savedSearchEl.classList.add('saved-btn');
    savedSearchEl.innerText = city;
    savedSearch.appendChild(savedSearchEl);
    savedSearchEl.addEventListener('click', function(e){
      e.preventDefault();
      var citySearch = e.target.innerText;
      searchLatLon(citySearch);
    })
}

//function to run on start that checks local storage for saved searches and creates saved search buttons
function init(){
  var cityEl = JSON.parse(localStorage.getItem('saved search'));
  if(cityEl){
  for(var i = 0; i < cityEl.length; i++){
  city = cityEl[i].city;
  var savedSearchEl = document.createElement('button');
  savedSearchEl.classList.add('saved-btn');
  savedSearchEl.innerText = city;
  savedSearch.appendChild(savedSearchEl);
  savedSearchEl.addEventListener('click', function(e){
    e.preventDefault();
    var citySearch = e.target.innerText;
    searchLatLon(citySearch);
  })};
}
}
init();
