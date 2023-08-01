const expresss = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const userRoute = require('./routes/userRoute');
const transRoute = require('./routes/transactionsRoute')
const path = require('path');

dotenv.config();

connectDB();
// rest object
const app = expresss();
app.use(morgan('dev'));
app.use(expresss.json());

app.use(expresss.static(path.join(__dirname, './client/build')));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
} )

//user 
app.use('/api/v1/users', userRoute)

// transaction

app.use('/api/v1/transactions', transRoute)

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listen at Port ${PORT}`);
});