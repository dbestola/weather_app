
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
var time = document.getElementById('time')

function clock() {
  var date = new Date()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  time.innerHTML = (` ${hours} : ${minutes} ${ampm}`)

}

clock()


// Initialize the Chart.js chart
const ctx = document.getElementById('rainChart').getContext('2d');
const rainChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // This will be populated with data from the API
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1
      },
      {
        label: 'Real Feel (°C)',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1
      },
      {
        label: 'Wind Speed (m/s)',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1
      },
      {
        label: 'Humidity (%)',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Function to update the chart with new data
function updateChart(data) {
  if (rainChart.data.datasets[0]) {
    rainChart.data.datasets[0].data = data.temps; // Temperature data
  }
  if (rainChart.data.datasets[1]) {
    rainChart.data.datasets[1].data = data.feels; // Real feel data
  }
  if (rainChart.data.datasets[2]) {
    rainChart.data.datasets[2].data = data.winds; // Wind speed data
  }
  if (rainChart.data.datasets[3]) {
    rainChart.data.datasets[3].data = data.humidities; // Humidity data
  }

  rainChart.data.labels = data.labels;
  rainChart.update();
}






const HandleSubmit = (e) => {
  e.preventDefault()

  const API_KEY = '50e011a9acc81ee3ed08622ff8255a25'
  let currentCity = search.value
  var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${API_KEY}&units=metric`;

  fetch(weatherAPI)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const labels = [];
      const temps = [];
      const feels = [];
      const winds = [];
      const humidities = [];

      data.list.forEach((entry) => {
        labels.push(new Date(entry.dt_txt).toLocaleTimeString());
        temps.push(Math.floor(entry.main.temp));
        feels.push(Math.floor(entry.main.feels_like));
        winds.push(Math.floor(entry.wind.speed));
        humidities.push(Math.floor(entry.main.humidity));
      });

      updateChart({ labels, temps, feels, winds, humidities });

      // Use the first entry for the current weather display
      const firstEntry = data.list[0];
      
      locationSpan.innerHTML = data.city.name;
      temp.innerHTML = Math.floor(firstEntry.main.temp) + '°';
      realFeel.innerHTML = Math.floor(firstEntry.main.feels_like) + '°';
      wind.innerHTML = Math.floor(firstEntry.wind.speed) + ' m/s'; // Changed to wind speed
      humid.innerHTML = Math.floor(firstEntry.main.humidity) + '%';
      pressure.innerHTML = Math.floor(firstEntry.main.pressure) + ' Pa';
  
    })
    .catch((error) => {
      console.log(error);
    });

};

submit.addEventListener('click', HandleSubmit)

search.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    HandleSubmit(e);
    search.blur();
  }
});



