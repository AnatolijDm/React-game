const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const PORT = config.get('port') || 8080;

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./src/server/router'));
//app.use('/api/link', require('/src/server/link.route'));

if(process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () =>
            console.log(`App is running on https://localhost:${PORT}`)
        );
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

