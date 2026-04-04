require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

connectDB();

app.use(express.json());

app.use('/api/auth' , require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use("/api/register",require('./routes/registrationRoutes'));

app.listen(3000, ()=>{console.log('Server running on port 3000')});