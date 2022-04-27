import { Connection } from './src/Connection';
import {ContextMenuInteraction} from 'discord.js';
import * as fs from 'fs';

const files:any = fs.readdirSync('./src/commands').filter((file:string) =>
    file.endsWith('.ts'));

let client = new Connection()
client.Start();

client.getClient.on('interactionCreate', async (interaction:ContextMenuInteraction) => {
    let command = null;
    for (let file of files) {
        file=require(`./src/commands/${file}`)
        if(file.name===interaction.commandName){
            command=file;
        }
    }
    if(command !== null) {
        command.execute(interaction)
    }
})