var lat = "",
  log = "",
  cityName = "",
  country = "",
  temp, minTemp, maxTemp, iconID;
var unit = "metric";

function setVal() {
  $("#city_name").text(cityName);
  $("#country").text(country);
  $("#temp").text(temp);
  $("#min").text(minTemp);
  $("#max").text(maxTemp);

  iconsJSON = "https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json";

  $.getJSON(iconsJSON, function(weatherIcons) {
    console.log(JSON.stringify(weatherIcons));
    var prefix = 'wi wi-';
    var code = iconID;
    var icon = weatherIcons[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }

    // Finally tack on the prefix.
    icon = prefix + icon;
    console.log(icon);
    $("#weather-icon").addClass(icon);

  });

}

function getVal() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude.toFixed(1).toString();
      log = position.coords.longitude.toFixed(1).toString();
      console.log(lat);
      console.log(log);
      var apiID = "af0518ddcd38616ad465c1f015fe82e3";

      var apiCall = "http://api.openweathermap.org/data/2.5/weather?"
      apiCall += "lat=" + lat;
      apiCall += "&lon=" + log;
      apiCall += "&units=" + unit;
      apiCall += "&APPID=" + apiID;

      console.log(apiCall);

      $.getJSON(apiCall, function(json) {
        cityName = json.name;
        country = json.sys.country;
        temp = Math.round(json.main.temp);
        minTemp = Math.round(json.main.temp_min);
        maxTemp = Math.round(json.main.temp_max);
        iconID = json.weather[0].id;
        console.log(cityName, country, temp, minTemp, maxTemp, iconID);
        setVal();
      });

    });
  }
}

function changeVal(){
  
  var exh ;
  
  if(unit == "metric"){
    unit = "imperial";
    exh = function(val){
      return val* 9 / 5 + 32;
    };
  }
  else{
    unit = "metric";
    exh = function(val){
      return val;
    };
  }
 
  
  $("#temp").text(Math.round(exh(temp)));
  $("#min").text(Math.round(exh(minTemp)));
  $("#max").text(Math.round(exh(maxTemp)));
}


$(document).ready(function() {
  getVal();
  
  $("#fc").on("click", changeVal);
  
});