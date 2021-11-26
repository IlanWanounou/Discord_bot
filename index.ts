import { Connection } from './src/Connection';
import {Interaction} from "discord.js";
import * as fs from 'fs';

const files = fs.readdirSync('./src/commands').filter((file:string) =>
    file.endsWith('.ts'));

let client = new Connection()
client.Start();

client.getClient.on('interactionCreate', async (interaction:Interaction) => {
    let command = null;
    for (let file of files) {
        file=require(`./src/commands/${file}`)
        if(file.name===interaction.commandName){
            command=file
        }
    }
    if(command !== null) {
        command.execute(interaction, client.getClient)
    }
})