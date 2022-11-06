var citySearch = document.querySelector("#city-search").value;
var searchBtn = document.querySelector(".search");
var liContainer = document.querySelector('.list-group');
var cardTitle = document.querySelector('.card-body');

var lat;
var lon;
var weatherArr = [];

searchBtn.addEventListener("click", searchLatLon);

function searchLatLon() {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      citySearch +
      "&limit=5&appid=54af2aadd2e4e94c91bb5c0452485474"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //get the latitude and longitude from the city search to perform another api call with
      lat = data[0].lat;
      lon = data[0].lon;
    })
    .then(function(){
      fetch(
        //using the lat/lon from previous call get the weather info for the next 5 days
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" + lon +
          "&APPID=54af2aadd2e4e94c91bb5c0452485474&units=imperial"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
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
          console.log(date, icon, temp, windSpeed, humidity);

          var titleEl = document.createElement('h5');
          titleEl.classList.add('card-title');
          titleEl.innerText = (citySearch + "(" + date + ")");
          cardTitle.appendChild(titleEl);
          var iconImg = document.createElement('img');
          iconImg.src = "http://openweathermap.org/img/w/" + icon + ".png";
          cardTitle.appendChild(iconImg);

          weatherArr = [temp, windSpeed, humidity]
          for (let i = 0; i < weatherArr.length; i++){
            var liEl = document.createElement('li');
            liEl.classList.add('list-group-item');
            liEl.innerText = weatherArr[i];
            liContainer.appendChild(liEl);
          }
        });
    });
  citySearch;
}



// arrary values needed = [0,7,15,23,31,39]