let btn = document.querySelector('button')
let weatherDiv = document.querySelector('.WeatherContainer')
let input = document.querySelector('.input')
let countryName = document.querySelector('.CountryName')
let degree = document.querySelector('.degree')
let icon = document.querySelector(' .icon i')
let WindSpeed = document.querySelector('.WindSpeed')
let pressure = document.querySelector('.pressure')
let wrongMassage = document.querySelector('.wrong')


let locations = [
    {
        name: "Cairo",
        latitude: 30.0626,
        longitude: 31.2497
    },
    {
        name: "Paris",
        latitude: 48.8391,
        longitude: 2.3582
    },
    {
        name: "Alexandria",
        latitude: 31.1994,
        longitude: 29.9023
    },
    {
        name: "Riyadh",
        latitude: 24.6877,
        longitude: 46.7219
    },
    {
        name: "New York",
        latitude: 40.7128,
        longitude: -74.0060
    },
    {
        name: "London",
        latitude: 51.5074,
        longitude: -0.1278
    },
    {
        name: "Berlin",
        latitude: 52.5200,
        longitude: 13.4050
    },
    {
        name: "Tokyo",
        latitude: 35.6895,
        longitude: 139.6917
    },
    {
        name: "Sydney",
        latitude: -33.8688,
        longitude: 151.2093
    },
    {
        name: "Moscow",
        latitude: 55.7558,
        longitude: 37.6173
    },
    {
        name: "Dubai",
        latitude: 25.276987,
        longitude: 55.296249
    },
    {
        name: "Beijing",
        latitude: 39.9042,
        longitude: 116.4074
    },
    {
        name: "Seoul",
        latitude: 37.5665,
        longitude: 126.9780
    },
    {
        name: "Mumbai",
        latitude: 19.0760,
        longitude: 72.8777
    }
];





locations.forEach((location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=1517d2399492cb943edf7a5ca4dcdf7e&units=metric`)
        .then(
            (w) => {
                let data = w.json()
                return data
            }
        ).then(
            (value) => {
    console.log(value)
                input.addEventListener('input', () => {
                    weatherDiv.classList.remove('animate')
                    wrongMassage.classList.remove('hide')
                })
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                    weatherDiv.classList.add('animate')
                    if (input.value === location.name) {
                        wrongMassage.classList.add('hide')
                        weatherDiv.style.display = 'flex'
                        countryName.innerText = location.name
                        degree.innerText = `${Math.floor(value.main.temp_max)}°`
                        WindSpeed.innerText = `${value.wind.speed} m/s`
                        pressure.innerText = `${value.main.pressure} mb`
                        if (25 < value.main.temp_max && value.main.temp_max < 40) {
                            icon.className = 'fa-solid'
                            icon.classList.add('fa-sun')
                            icon.style.color = 'yellow'
                        }
                        if (10 < value.main.temp_max && value.main.temp_max < 25) {
                            icon.className = 'fa-solid'
                            icon.classList.add('fa-cloud-sun')
                        }
                        if (5 < value.main.temp_max && value.main.temp_max < 10) {
                            icon.className = 'fa-solid'
                            icon.classList.add('fa-snowflake')
                        }
                        input.value = ''

                    } else {

                        wrongMassage.style.display = 'block'
                        wrongMassage.innerText = 'Invaild Country Name'
                        setTimeout(() => {
                            wrongMassage.style.display = 'none'
                        }, 2000)
                    }


                })

            }
        ).catch((error) => {
            btn.disabled = true
            wrongMassage.innerText = `We Have Some Issues Please Try Again`;
            wrongMassage.style.display = 'block';
            setTimeout(() => wrongMassage.style.display = 'none', 5000);
        });

})


