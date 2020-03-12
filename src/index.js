const server = require('./config/server');
require('./app/endpoints/estudiantes')(server);
server.listen(server.get("port"), () => console.log(`El server esta corriendo en el puerto ${server.get("port")}`));