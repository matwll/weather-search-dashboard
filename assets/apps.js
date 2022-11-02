




fetch(
    api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={73dbe410e3547196b2b5e406ca7e7a25}
)
.then (response => response.json())
.then(data => console.log(data));