
let locationSpan = document.querySelector('.location')
let search = document.querySelector('.search')

let temp = document.getElementById('temp')
let humid = document.querySelector('.humid')
let realFeel = document.querySelector('.real-feel')
let wind = document.querySelector('.wind')
let pressure = document.querySelector('.pressure')
let sunrise = document.querySelector('.rise')
let sunset = document.querySelector('.set')
let clouds = document.querySelector('.clouds')

var submit = document.querySelector('.submit')
var time = document.getElementById ('time')

function clock() {
    var date = new Date ()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0'+minutes : minutes;

    time.innerHTML = (` ${hours} : ${minutes} ${ampm}`)
    
}

clock()




const HandleSubmit = (e) =>{
  e.preventDefault()

  const API_KEY = '50e011a9acc81ee3ed08622ff8255a25'
let  currentCity = search.value
var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`

fetch(weatherAPI)
.then((response) =>{
return response.json()
})
.then((data) =>{
  console.log(data);
  locationSpan.innerHTML = data.name

  temp.innerHTML = Math.floor(data.main.temp) + '°'
  realFeel.innerHTML = Math.floor(data.main.feels_like) + '°'
  wind.innerHTML = Math.floor(data.wind.deg)
  humid.innerHTML = Math.floor(data.main.humidity) + '%'
  pressure.innerHTML = Math.floor(data.main.pressure) + 'Pa'
  sunrise.innerHTML = Math.floor(data.sys.sunrise)
  sunset.innerHTML = Math.floor(data.sys.sunset)
})

}

submit.addEventListener('click',HandleSubmit)
