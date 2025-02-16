require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connection} = require('./src/database');
const expressApp  = require('./express-app');
const app = express();
const PORT = process.env.PORT || 3001;


const StartServer = async() => {

    const app = express();
    
    await connection();
    
    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT} http://localhost:${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })

    
}

StartServer();
