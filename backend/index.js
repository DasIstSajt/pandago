const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/userRoutes.js'), require('./routes/journeyRoutes.js'));
app.use('/ut', require('./routes/utazasRoutes.js'))

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})