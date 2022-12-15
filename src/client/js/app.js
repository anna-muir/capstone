/* Function called by event listener */
function performAction(e) {
    getGeonames();
    async function getGeonames() {
        // User-entered values arrival date, departure date, and city
        const enteredPlace = document.getElementById('city').value;
        const enteredDate = document.getElementById('date').value;
        const enteredDepDate = document.getElementById('end-date').value;

        // Fetch entered place data
        const response = await fetch(`/geonames/${enteredPlace}`);
        const geonameData = await response.json();

        const geonameDataArray = geonameData.geonames;
        const lat = geonameDataArray[0].lat;
        const lng = geonameDataArray[0].lng;

        // Fetch destination data
        const destination = document.getElementById('city').value;
        const response3 = await fetch(`/pixabay/${destination}`);
        const pixData = await response3.json();
        const photo = pixData.hits[0].webformatURL;

        // Fetch weather based on lat and long
        const response2 = await fetch(`/weather/${lat},${lng}`)
        const weatherData = await response2.json();

        // For each loop to access weather for a given day
        const weatherDataArray = weatherData.data;
        weatherDataArray.forEach(elt => {
            const day = elt;
            const maxTemp = day.app_max_temp;
            const minTemp = day.app_min_temp;
            const description = day.weather.description;
            const date = day.valid_date;

            if (enteredDate === date) {
                console.log(maxTemp, minTemp, description, date);
            }
            else {
                return false;

            }

            // Stores data in server to use if wanted to access past entries
            const postData = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(weatherDataArray)
            };
            fetch('/weather', postData);

            // UI configurations
            document.getElementById('location').innerHTML = enteredPlace;
            document.getElementById('dateUI').innerHTML = enteredDate;
            document.getElementById('high').innerHTML = `High: ${maxTemp}`;
            document.getElementById('low').innerHTML = `Low: ${minTemp}`;
            document.getElementById('des').innerHTML = `Description: ${description}`;
            document.getElementById('photo').src = photo;


            // Countdown Code
            let todayDate = new Date();
            let todayDateFormat = todayDate.toISOString().split('T')[0];
            let date1 = new Date(todayDateFormat);
            let date2 = new Date(enteredDate);
            let distance = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
            console.log(distance);

            document.getElementById('countdown').innerHTML = `${distance} days until your trip!`;


            // Length of Trip Code
            let arrivalDate = new Date(enteredDate);
            let depDate = new Date(enteredDepDate);
            let difference = (depDate.getTime() - arrivalDate.getTime()) / (1000 * 3600 * 24);
            console.log(difference);

            document.getElementById('length').innerHTML = `Your trip is ${difference} days long.`;

        })

    }

}

export { performAction }