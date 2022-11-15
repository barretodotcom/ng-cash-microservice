import "dotenv/config"
import { connectToDatabase } from "../typeorm/connection";
import { RabbitMQConnection } from "./rmqConnection";
async function consumeMessages() {

    await connectToDatabase()
    await RabbitMQConnection.consumeMessageFrom('transactions');

}

consumeMessages();