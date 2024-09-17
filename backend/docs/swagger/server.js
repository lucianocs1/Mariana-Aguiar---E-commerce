const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(8080, () => {
  console.log("API documentation: http://localhost:8080/docs");
});

/* Endpoints */
require("./endpoints")(app); // Importa o arquivo de rotas e passa o 'app'
