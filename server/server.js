const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const transaction = require('./routes/transactions')
const cors = require('cors')
const { db } = require('./db/db');
const {readdirSync} = require('fs')

app.use(cors())
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/protected', protectedRoute);
app.use('/api/v1', transaction)

//readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/transaction' + route)))


const PORT = process.env.PORT || 9000;

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

server();