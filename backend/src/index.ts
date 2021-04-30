import {$log} from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
// import { Response } from 'express';
// import path from 'path';
import {Server} from './Server';

async function bootstrap() {
  try {
    $log.debug('Start server...');
    const platform = await PlatformExpress.bootstrap(Server);

    
    // platform.app.use('/', function(req: Request, res: Response) {
    //   console.log(req);
    //   // const root = path.resolve(__dirname, '../build');
    //   // res.sendFile('index.html', { root });
    // });

    await platform.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
