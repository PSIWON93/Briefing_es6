const weather = document.querySelector(".js-weather");
const API_KEY = "30323086eb3a311fc188418936e96651";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C ${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(postion){
    const latitude = postion.coords.latitude;
    const longitude = postion.coords.longitude;
    // 이름이 같은 변수의 경우 아래와 같은 형식으로 입력가능하다
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geolocation");
}

function askForCoords(){
    //getCurrentPosition(좌표를 가져오는 것을 성공 할 시 실행할 함수, 실패시 실행할 함수 )
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
       // getWeather
       const parseCoords = JSON.parse(loadedCoords);
       getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}


init();
