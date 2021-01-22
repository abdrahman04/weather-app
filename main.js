

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
  }
  
  

  function getweather(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    //*******************************************************************//
    var key = '*********************************';
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
    var key = '*********************************';
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&units=metric&appid='+key)  
    .then(response => {
            // console.log(response)
            return response.json()
        }).then (data => {
            console.log(data)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        // console.log(tomorrow)          
        var tomStr = ""+tomorrow+"";
        var sptTom = tomStr.split(" ");
        // console.log(sptTom[0]);
        document.getElementById("day").innerHTML= sptTom[0]+" :";
                document.getElementById("forecast-tom").innerHTML= data.list[7].main.temp+"°C";
               var skyTom = document.getElementById("sky-tom");
               var icon = data.list[7].weather[0].icon;
               skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";

        const afTom = new Date(today);
        afTom.setDate(afTom.getDate()+2)
        var tomStraf = ""+afTom+"";
        var sptTomaf = tomStraf.split(" ");
        // console.log(sptTomaf[0])
        document.getElementById("day-af").innerHTML= sptTomaf[0]+":";
              document.getElementById("forecast-aftom").innerHTML= data.list[15].main.temp+"°C";
              var skyTom = document.getElementById("sky-tom-af");
              var icon = data.list[15].weather[0].icon;
              skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
        const afTomtwo = new Date(today);
        afTomtwo.setDate(afTomtwo.getDate()+3)
        var tomStraftwo = ""+afTomtwo+"";
        var sptTomaftwo = tomStraftwo.split(" ");
        // console.log(sptTomaftwo[0]);
            document.getElementById("day-af-two").innerHTML= sptTomaftwo[0]+":";
            document.getElementById("forecast-aftom-two").innerHTML= data.list[23].main.temp+"°C";
            var skyTom = document.getElementById("sky-tom-aftwo");
            var icon = data.list[23].weather[0].icon;
            skyTom.src =  "http://openweathermap.org/img/wn/"+icon+".png";
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
    var key = '*********************************';
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
      var key = '*********************************';
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





