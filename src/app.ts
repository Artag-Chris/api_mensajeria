import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { createServer } from 'http';
import { WssService } from './notifications/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  });
  const httpServer= createServer(server.app);
  WssService.initWss({server: httpServer});
  
server.setRoutes(AppRoutes.routes);

httpServer.listen(envs.PORT, () => {
  console.log(`Server corriendo en el puerto ${ envs.PORT }`);
});
}