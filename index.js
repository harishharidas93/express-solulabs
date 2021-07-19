const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const routes = require('./routes.js');
const errorHandler = require('./_helpers/error-handler.js');
const jwt = require('./_helpers/jwt.js');
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Solulabs API",
      description: "Solulabs API Information",
      contact: {
        name: "Harish"
      },
      servers: ["http://localhost:4000"]
    }
  },
  apis: ["routes.js"]
};

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.use(
  rateLimit({
    windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 1000,
    message: "You exceeded 1000 requests in 12 hour limit!",
    headers: true,
  })
);

app.use(jwt());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', routes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
  );
});
