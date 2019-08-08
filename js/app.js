let tempTxt = document.querySelector('.temp');
let locTxt = document.querySelector('.loc');
let wDesc = document.querySelector('.w-desc');
let wImg = document.querySelector('.w-img img');
let userLocation = document.querySelector('.city');
let userCountryCode = document.querySelector('.country');
let docBody = document.querySelector('body');

userLocation.addEventListener('keyup', function(e){
    e.preventDefault();
    if (e.keyCode == 13 || e.keyCode == 9) {
        getWeather();
    }
})

/* API Stuff */

function getWeather() {

    let apiKey = '';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${userLocation.value}&units=metric&APPID=${apiKey}`;
    let req = new XMLHttpRequest;

    req.onreadystatechange = function(){
        if (req.readyState == 4) {
            if (req.status == 200) {
                let data = JSON.parse(req.response);
                let apiImgLoc = data.weather[0].icon;
                tempTxt.textContent = Math.trunc(data.main.temp);
                locTxt.textContent = data.name;
                wDesc.textContent = data.weather[0].description;
            
                wImg.src = `http://openweathermap.org/img/wn/${apiImgLoc}@2x.png`;

            } else if (req.status == 404){
                console.log('Could not make a request, sorry pal!')
            }
        }
    }
    req.open('GET', url, true);
    req.send();
}

getWeather();