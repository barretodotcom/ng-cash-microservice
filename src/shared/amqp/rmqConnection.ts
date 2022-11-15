import amqp from 'amqplib';
import { AccountRepository } from '../../modules/accounts/typeorm/repositories/AccountRepository';
import { CreateTransactionService } from '../../modules/transactions/services/CreateTransaction';

const environ = process.env

const connectionString = `
    amqp://${environ.AMQP_USER}:${environ.AMQP_PASS}@${environ.AMQP_HOST}:${environ.AMQP_PORT}/${environ.AMQP_VHOST}
`

export class RabbitMQConnection {

    static async sendMessageTo(queue: string, message: any) {
        const connection = await amqp.connect(connectionString);

        const channel = await connection.createChannel();

        await channel.assertQueue(queue, {
            durable: false,
            autoDelete: true,
            arguments: {
                'x-queue-mode': 'lazy'
            }
        })
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    static async consumeMessageFrom(queue: string) {
        const connection = await amqp.connect(connectionString);
        console.log("Sucess AMQP connection.")
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, {
            durable: false,
            autoDelete: true,
            arguments: {
                'x-queue-mode': 'lazy',
            }
        })

        await channel.consume(queue, async (message) => {
            const messageContent = message?.content as Buffer;
            const parsedMessage = JSON.parse(messageContent.toString());
            await CreateTransactionService.execute(parsedMessage)
        })
    }
}