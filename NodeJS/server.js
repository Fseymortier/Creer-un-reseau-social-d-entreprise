const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./app/routes/user.routes');
const postRoutes = require('./app/routes/post.routes');
const likeRoutes = require('./app/routes/like.route');
const comRoutes = require('./app/routes/com.route');

var corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync();
// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur Groupomania.' });
});
app.use('/images', express.static('./app/images'));
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/coms', comRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT);
