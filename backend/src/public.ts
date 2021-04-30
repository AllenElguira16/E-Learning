// import { Response, Request } from 'express';
import { Controller, Get, Redirect, View } from '@tsed/common';


@Controller('/')
export class home {
  @Get('/')
  @Redirect('/home')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public main(): void {}

  @Get('/home/?*')
  @Get('/admin/?*')
  @View('index.html')
  public async home(): Promise<string> {
    return '';
  }
}
