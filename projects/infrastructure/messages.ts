import { PubSub } from "@google-cloud/pubsub";
import { IMessagePublisher, Message } from "../common";

const pubSubClient = new PubSub({
    projectId: process.env.PUB_SUB_PROJECT_ID,
});

class MessagePublisher implements IMessagePublisher {
    async publishMessage(topicName: string, { data, attributes }: Message): Promise<void> {
        await pubSubClient.topic(topicName).publishMessage({
            data: data ? Buffer.from(JSON.stringify(data)) : null,
            attributes,
        });
    }
}

export const getMessagePublisher = () => new MessagePublisher as IMessagePublisher;
