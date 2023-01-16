const express = require('express');
const userRouter = require('./routers/user')

const PORT = 6000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API for learning authentication')
})

app.use('/api', userRouter);
app.listen(PORT, ()=>{
    console.log('Listening on PORT: ' + PORT)
})