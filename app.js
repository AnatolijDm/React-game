const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const PORT = config.get('port') || 8080;

const app = express();

app.use('/api/auth', require('./src/server/router'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () =>
            console.log(`App is running on http://localhost:${PORT}`)
        );
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

