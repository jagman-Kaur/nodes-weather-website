
    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
    const message1 = document.querySelector('#msg1')
    const message2 = document.querySelector('#msg2')

    message1.textContent = 'Loading...'
    message2.textContent = ''

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        const url = '/weather?address=' + location

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    message1.textContent = data.error
                }
                else {
                    message1.textContent = data.address
                    message2.textContent = "It is " + data.description + ". It is " + data.currentTemp + " degrees out. It feels like " + data.feelsLikeTemp + " degrees out. Wind speed is " + data.windSpeed
                }
                    
            })
        })
       
    })