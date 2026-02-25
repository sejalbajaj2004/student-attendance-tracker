require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const { MongoMemoryServer } = require('mongodb-memory-server');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const exportRouter = require('./routes/export');


const app = express();


// Set up MongoDB connection
// mongoose.connect("mongodb://localhost:27017/mydatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('index', { title: 'Student Attendance System' });
});

app.use('/students', studentRoutes);
app.use('/attendance', attendanceRoutes);
app.use("/", exportRouter);

// app.listen(3000, () => {
//     console.log(`Server running`);
// });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

