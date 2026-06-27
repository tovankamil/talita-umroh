const http = require('http');

const data = JSON.stringify({
  name: "Jajang Tarwita",
  email: "jajang@talita.com",
  password: "jajang1234",
  phone: "081234567890",
  role: "agent"
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/v1/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let resData = '';
  res.on('data', (chunk) => {
    resData += chunk;
  });
  res.on('end', () => {
    console.log(resData);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
