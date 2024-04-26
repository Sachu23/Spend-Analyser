const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/protected', protectedRoute);

app.get('/', async (req, res)=>{
    console.log("Server ping");
    res.json("Hello from Server!");
})


const PORT = process.env.PORT || 9000;
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });