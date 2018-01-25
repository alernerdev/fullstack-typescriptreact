import webpack from 'webpack';
import express from 'express';
import open from 'open';
import path from 'path';

import config from '../webpack.config.dev';

const bodyParser = require('body-parser');

const app = express();
const port = normalizePort(process.env.PORT || 3001);
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: false,
    publicPath: config.output.publicPath
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// __dirname is whatever dir this server is running out of

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	next();
  });

app.use("/", require('./routes/mainRoutes'));

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log(`App listening on port ${port}`);
		open(`http://localhost:${port}`);
	}
});


function normalizePort(val) {
	var port = parseInt(val, 10);
  
	if (isNaN(port)) {
	  // named pipe
	  return val;
	}
  
	if (port >= 0) {
	  // port number
	  return port;
	}
  
	return false;
}