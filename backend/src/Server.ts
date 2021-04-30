import {Env} from '@tsed/core';
import {Configuration, Inject} from '@tsed/di';
import {$log, PlatformApplication} from '@tsed/common';
import '@tsed/platform-express'; // /!\ keep this import
import express, { NextFunction, Request, Response } from 'express';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import '@tsed/ajv';
import '@tsed/typeorm';
import typeormConfig from './config/typeorm';
import '@tsed/multipartfiles';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

if (isProduction) {
  $log.appenders.set('stdout', {
    type: 'stdout',
    levels: ['info', 'debug'],
    layout: {
      type: 'json'
    }
  });

  $log.appenders.set('stderr', {
    levels: ['trace', 'fatal', 'error', 'warn'],
    type: 'stderr',
    layout: {
      type: 'json'
    }
  });
}

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    disableRoutesSummary: isProduction
  },
  mount: {
    '/rest': [
      `${rootDir}/controllers/**/*.ts`
    ],
    '/': [
      `${rootDir}/public.ts`
    ],
  },
  multer: {
    dest: `${rootDir}/../static`,
    storage: multer.diskStorage({
      destination(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
        callback(null, `${rootDir}/../static`);
      },
      filename(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
        const newFileName = crypto.randomBytes(18).toString('hex');
        const fileExtension = path.extname(file.originalname);
        callback(null, `${newFileName}${fileExtension}`);
      }
    })
  },
  statics: {
    '/': [
      {
        root: `${rootDir}/../../frontend/build`
      }
    ],
    '/statics': [
      {
        root: `${rootDir}/../static/`
      }
    ],
  },
  views: {
    root: path.resolve(rootDir, '../../frontend/build'),
    viewEngine: 'ejs',
    extensions: {
      'html': 'ejs'
    }
  },
  typeorm: typeormConfig,
  exclude: [
    '**/*.spec.ts'
  ],
  ajv: {
    errorFormatter: (error) => `'${error.instancePath}' ${error.message}`,
    verbose: true,
    allErrors: true
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(express.json())
      .use(express.urlencoded({
        extended: true
      }));
  }
}
