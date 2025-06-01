import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, ClientOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    const clientOptions: ClientOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || ''],
        queue: 'question_queue',
        queueOptions: {
          durable: false,
        },
      },
    };

    this.client = ClientProxyFactory.create(clientOptions);
  }

  async getQuestions() {
    return this.client.send('get-questions', {});
  }
}
