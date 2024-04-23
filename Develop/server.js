const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')
const PORT = 3001;
const app = express();


//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// apiRoutes.js middleware
app.use('/api', apiRoutes);

// htmlRoutes.js middleware
app.use('/', htmlRoutes);




app.listen(PORT, () => {
    console.log(`Note-Taker app listening at http://localhost:${PORT}`);
  });
  