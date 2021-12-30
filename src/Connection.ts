import {Client, Intents} from "discord.js";
import *  as dotenv from 'dotenv';

dotenv.config()

export class Connection {
    private client: Client;
    private queue: Map<any, any>;

    constructor() {
        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ]
        })
        this.queue = new Map;
    }

    public Start(): void {
        this.client.login(process.env.TOKEN)
        this.client.on("ready", () => {
            console.log('On !');
        })
    }

    public get getClient(): Client {
        return this.client;
    }

    public get getQueue(): Map<any, any> {
        return this.queue;
    }
}
