let btn = document.querySelector('button')
let weatherDiv = document.querySelector('.WeatherContainer')
let input = document.querySelector('.input')
let countryName = document.querySelector('.CountryName')
let degree = document.querySelector('.degree')
let icon = document.querySelector(' .icon i')
let WindSpeed = document.querySelector('.WindSpeed')
let pressure = document.querySelector('.pressure')
let wrongMassage = document.querySelector('.wrong')

btn.addEventListener('click', (e) => {
    e.preventDefault()
})


function Weather() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=1517d2399492cb943edf7a5ca4dcdf7e&units=metric`;
    fetch(apiUrl)
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

                weatherDiv.classList.add('animate')
                if (input.value === value.name) {
                    wrongMassage.classList.add('hide')
                    weatherDiv.style.display = 'flex'
                    countryName.innerText = value.name
                    degree.innerText = `${Math.floor(value.main.temp_max)}°`
                    WindSpeed.innerText = `${value.wind.speed} m/s`
                    pressure.innerText = `${value.main.pressure} mb`
                    if (25 < value.main.temp_max) {
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




            }
        ).catch((error) => {
            btn.disabled = true
            wrongMassage.innerText = `We Have Some Issues Please Try Again`;
            wrongMassage.style.display = 'block';
            setTimeout(() => wrongMassage.style.display = 'none', 5000);
        });

}


