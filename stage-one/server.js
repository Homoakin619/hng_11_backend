require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.set('trust proxy', true)

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  const clientIp = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress
  
  const apiKey = process.env.API_KEY
  console.log(apiKey)
  try {
    
    const request = await fetch('http://ip-api.com/batch',{
      method: "post",
      body: JSON.stringify([""+clientIp])
  })
  const response = (await request.json())[0]
    const { lat,lon, city } = response;

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const temperature = (await weatherResponse.json()).main.temp - 273;
    console.log(clientIp)

    res.json({
      client_ip: clientIp,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature.toFixed(1)} degrees Celsius in ${city}`
    });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
