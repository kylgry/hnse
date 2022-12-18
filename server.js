const express = require('express');
const cors = require("cors");
const path = require('path');
const routes = require("./routes")

const app = express();

app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'react-ui/build')))

app.use('/api', routes)

app.get('*', function(request, response) {
response.sendFile(path.resolve(__dirname, 'react-ui/build', 'index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT)