const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

//console.log(process.env.MONGO_URI);
mongoose.connect('mongodb+srv://ssrini52:Sachu%40007@cluster0.j0uzqjk.mongodb.net/Spend-Analyser', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: {type: String, required: true}
    });
 
module.exports = mongoose.model('User', userSchema);