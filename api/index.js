import express from 'express';
import cors from 'cors';
import config from 'config';
import bodyParser from 'body-parser';
import ProducRoutes from './server/routes/ProducRoutes';

const app = express();

//client/config/.yml
const serverConfig = config.get('server');

// 全てのAPIをCORS許可
app.use(cors());
// app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api paramater
app.use('/api/v1/products', ProducRoutes);


// import path from 'path'; if use path
if(process.env.NODE_ENV == 'production') {
  app.get('*', function (req, res) {
    // res.sendFile(path.join('./', 'dist', 'index.html'))
    res.send('This enviroment is production.');
  })
  console.log(`Seems like the backend is running fine on ${process.env.NODE_ENV}`);
} else if(process.env.NODE_ENV == 'development') {
  app.get('*', function(req, res) {
    res.send('test api');
  });
  console.log(`Seems like the backend is running fine on ${process.env.NODE_ENV}`);
} else {
  console.log('Failed to start the api server');
}

//in Heroku wite this 'process.env.PORT || serverConfig.port'
app.listen(process.env.NODE_ENV == 'production' ? process.env.DB_PORT : serverConfig.port || serverConfig.port,
  () => {console.log(`server starting -> [port] ${serverConfig.port} [env] ${process.env.NODE_ENV}`)}
);

export default app;