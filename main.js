

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getweather);
      navigator.geolocation.getCurrentPosition(forecast);
      navigator.geolocation.getCurrentPosition(forecastHours);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  function showimg(icon){
      
    var imgSky = document.getElementById("sky-img");
    imgSky.src = "http://openweathermap.org/img/wn/"+icon+".png";
    // var typeday;
    // var hr = (new Date()).getHours(); 
    // if(hr > 6 && hr < 19 ){
    //     typeday = "day";
    // }else {
    //     typeday = "night";
    // }
//     if(descsky == "clear sky" && typeday == "day"){
//         imgSky.src ="http://openweathermap.org/img/wn/01d.png";
//     }else if (descsky == "clear sky" && typeday == "night"){
//         imgSky.src ="http://openweathermap.org/img/wn/01n.png";
//     }else if (descsky == "few clouds" && typeday == "day"){
//         imgSky.src ="http://openweathermap.org/img/wn/02d.png";
//     }else if (descsky == "few clouds" && typeday == "night"){
//         imgSky.src ="http://openweathermap.org/img/wn/02n.png";
//     }else if (descsky == "scattered clouds" && typeday == "day"){
//         imgSky.src ="http://openweathermap.org/img/wn/03d.png";
//     }else if (descsky == "scattered clouds" && typeday == "night"){
//         imgSky.src ="http://openweathermap.org/img/wn/03n.png";
//     }else if (descsky == "broken clouds" && typeday == "day"){
//         imgSky.src ="http://openweathermap.org/img/wn/04d.png";
//     }else if (descsky == "broken clouds" && typeday == "night"){
//         imgSky.src ="http://openweathermap.org/img/wn/04n.png";
//     }else if (descsky == "shower rain" && typeday == "day"){
//         imgSky.src ="http://openweathermap.org/img/wn/09d.png";
//     }else if (descsky == "shower rain" && typeday == "night"){
//         imgSky.src ="http://openweathermap.org/img/wn/09n.png";
//     }

  }
  
  

  function getweather(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    //*******************************************************************//
    var key = '2de9a83d7b1bfcb3a2bd9fc6e82686eb';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' +lat+'&lon='+long+ '&units=metric&appid=' + key)  
    .then(response => {
            // console.log(response)
            return response.json()
        }).then (data => {
            console.log(data)
            console.log(data.main.temp);
            document.getElementById("city").innerHTML= data.name +", "+ data.sys.country;
            document.getElementById("sky").innerHTML= data.weather[0].description;
            document.getElementById("temperature").innerHTML= data.main.temp +"°C";
            document.getElementById("humidi").innerHTML="Humidity: "+ data.main.humidity+"%";
            document.getElementById("pressure").innerHTML="Pressure:  "+ data.main.pressure+" hPa";
            document.getElementById("visi").innerHTML="Visibility: "+ (data.visibility)/1000+" Km";
            document.getElementById("wind").innerHTML="Wind speed: "+ data.wind.speed+" m/s";
            var daterise= data.sys.sunrise;
            var dateset= data.sys.sunset;
            document.getElementById("rise").innerHTML=new Date(daterise*1000).getHours()+":"+ new Date(daterise*1000).getMinutes();
            document.getElementById("set").innerHTML=new Date(dateset*1000).getHours()+":"+ new Date(dateset*1000).getMinutes();
            /************************************************************************ */
            var descsky = data.weather[0].description;
            var iconSky = data.weather[0].icon;
            console.log(descsky)
            showimg(iconSky);

            })
        .catch(err => {
        	console.error(err);
        });
  }

  function forecast(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // console.log(lat, long)
    /*********************************************************************************** */
    var key = '2de9a83d7b1bfcb3a2bd9fc6e82686eb';
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&units=metric&appid='+key)  
    .then(response => {
            // console.log(response)
            return response.json()
        }).then (data => {
            console.log(data)
            const day = new Date().getDay();
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            // console.log(day)
            // console.log(days[day+1])
            // console.log("temp: "+days[day+1]+" "+data.list[7].main.temp)
            // document.getElementById("day").innerHTML= days[day+1]+":";
            // document.getElementById("forecast-tom").innerHTML= data.list[7].main.temp+" °C";
            // var skyTom = document.getElementById("sky-tom");
            // var icon = data.list[7].weather[0].icon
            // console.log(icon);
            // skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
            // document.getElementById("day-af").innerHTML= days[day+2]
            
            if(day <= 5){
               document.getElementById("day").innerHTML= days[day+1]+":";
               document.getElementById("forecast-tom").innerHTML= data.list[7].main.temp+"°C";
               var skyTom = document.getElementById("sky-tom");
               var icon = data.list[7].weather[0].icon;
               skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
            }else if(day == 6) {
              document.getElementById("day").innerHTML= days[day-6]+":";
              document.getElementById("forecast-tom").innerHTML= data.list[7].main.temp+"°C";
              var skyTom = document.getElementById("sky-tom");
              var icon = data.list[7].weather[0].icon;
              skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
            }
            
            if(day <= 4){
              document.getElementById("day-af").innerHTML= days[day+2]+":";
              document.getElementById("forecast-aftom").innerHTML= data.list[15].main.temp+"°C";
              var skyTom = document.getElementById("sky-tom-af");
              var icon = data.list[15].weather[0].icon;
              skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
           }else if(day >= 5) {
             document.getElementById("day").innerHTML= days[day-5]+":";
             document.getElementById("forecast-aftom").innerHTML= data.list[15].main.temp+"°C";
              var skyTom = document.getElementById("sky-tom-af");
              var icon = data.list[15].weather[0].icon;
              skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
           };

           if(day >= 4){
            document.getElementById("day-af-two").innerHTML= days[day-4]+":";
            document.getElementById("forecast-aftom-two").innerHTML= data.list[23].main.temp+"°C";
            var skyTom = document.getElementById("sky-tom-aftwo");
            var icon = data.list[23].weather[0].icon;
            skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
         }else if(day <= 3) {
           document.getElementById("day-af-two").innerHTML= days[day+3]+":  "+"  ";
           document.getElementById("forecast-aftom-two").innerHTML= data.list[23].main.temp+"°C";
            var skyTom = document.getElementById("sky-tom-aftwo");
            var icon = data.list[23].weather[0].icon;
            skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
         }




            })
        .catch(err => {
        	console.error(err);
        });
    
  }


  function forecastHours(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // console.log(lat, long)
    /************************************************************************************* */
    var key = '2de9a83d7b1bfcb3a2bd9fc6e82686eb';
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&units=metric&appid='+key)  
    .then(response => {
            // console.log(response)
            return response.json()
        }).then (data => {
              // console.log(data)
              // console.log(data.list)
              data.list.forEach(Element => {
                // console.log(Element.main.temp)
                //this is the temp data**************************
                const mainDiv = document.querySelector("#forecast-hours"); 
                let div = document.createElement("div");
                div.classList= "element-fore";
                let day = document.createElement("p");
                let img = document.createElement("img");
                let date = document.createElement("p");
                let temp = document.createElement("p");
                img.src = "http://openweathermap.org/img/wn/"+Element.weather[0].icon+".png";
                // console.log(datenotexact.getHours()+ datenotexact.getMinutes()); 
                // date.textContent = datenotexact.getHours()+":"+ datenotexact.getMinutes();
                let foredat = Element.dt_txt.split(" ");
                day.textContent = foredat[0];
                date.textContent = foredat[1];
                // console.log(date);
                temp.textContent = Element.main.temp+" °C";
                div.appendChild(img);
                div.appendChild(temp);
                div.appendChild(date);
                div.appendChild(day);
                mainDiv.appendChild(div);

              })

            })
        .catch(err => {
          console.error(err);
        });

    
  }





  window.addEventListener('load', getLocation());


  
 function getcity(){
  const form = document.querySelector("#form");
  var city = form.city.value;
  console.log(city);
      //*******************************************************************//
      var key = '2de9a83d7b1bfcb3a2bd9fc6e82686eb';
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=' + key)  
      .then(response => {
              // console.log(response)
              return response.json()
          }).then (data => {
              console.log(data)
              console.log(data.main.temp);
              document.getElementById("city").innerHTML= data.name+", "+ data.sys.country;
              document.getElementById("sky").innerHTML= data.weather[0].description;
              document.getElementById("temperature").innerHTML= data.main.temp +"°C";
              document.getElementById("humidi").innerHTML="Humidity: "+ data.main.humidity+"%";
              document.getElementById("pressure").innerHTML="Pressure:  "+ data.main.pressure+" hPa";
              document.getElementById("visi").innerHTML="Visibility: "+ (data.visibility)/1000+" Km";
              document.getElementById("wind").innerHTML="Wind speed: "+ data.wind.speed+" m/s";
              var daterise= data.sys.sunrise;
              var dateset= data.sys.sunset;
              document.getElementById("rise").innerHTML=new Date(daterise*1000).getHours()+":"+ new Date(daterise*1000).getMinutes();
              document.getElementById("set").innerHTML=new Date(dateset*1000).getHours()+":"+ new Date(dateset*1000).getMinutes();
              /************************************************************************ */
              var descsky = data.weather[0].description;
              var iconSky = data.weather[0].icon;
              console.log(descsky)
              showimg(iconSky);
  
              })
          .catch(err => {
            console.error(err);
          });

 }





