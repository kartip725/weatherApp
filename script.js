document.getElementById('weatherForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    if (!city) {
        resultDiv.textContent = 'Please enter a city name.';
        return;
    }
    // Only allow alphabetic characters and spaces
    if (!/^[a-zA-Z\s]+$/.test(city)) {
        resultDiv.textContent = 'Please enter a valid city name ("athani" "harugeri").';
        return;
    }
    resultDiv.textContent = 'Loading...';
    try {
        // Replace with your own API key from https://openweathermap.org/api
        const apiKey = 'abc@123'; // <-- Replace with your actual API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        resultDiv.innerHTML = `
            <strong>${data.name}, ${data.sys.country}</strong><br>
            Temperature: ${data.main.temp}°C<br>
            Weather: ${data.weather[0].main} (${data.weather[0].description})<br>
            Humidity: ${data.main.humidity}%<br>
            Wind: ${data.wind.speed} m/s
        `;
    } catch (error) {
        resultDiv.textContent = error.message;
    }
});
