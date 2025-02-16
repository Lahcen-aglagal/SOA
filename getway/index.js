require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
    res.json({ message: "Getway Microservice is running!" });
});

app.use('/api/customers', proxy('http://localhost:3001'));
app.use('/api/orders', proxy('http://localhost:3002'));
app.use('/api/products', proxy('http://localhost:3003'));
app.use('/api/shopping', proxy('http://localhost:3004'));
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});
// Start the service
app.listen(PORT, () => {
    console.log(`Getway Service running on port ${PORT} http://localhost:${PORT}`);
});
