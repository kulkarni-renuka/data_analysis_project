const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Mock Data Generator (AI Insights Simulation)
const generateRandomInsights = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const data = months.map((month) => ({
    month,
    usageHours: Math.floor(Math.random() * 100),  // Random usage hours
  }));
  return data;
};

// WebSocket Connection
wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendData = () => {
    const insights = generateRandomInsights();
    ws.send(JSON.stringify(insights));
  };

  // Send data every 5 seconds
  const interval = setInterval(sendData, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

// Basic API route
app.get('/', (req, res) => {
  res.send('WebSocket Server is Running...');
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
