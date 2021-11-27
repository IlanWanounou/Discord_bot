import *  as dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';
// @ts-ignore
import {REST, RouteLike} from '@discordjs/rest';
import { Routes }  from 'discord-api-types/v9'

export  class IntercationCommand {
    private token: number
    private clientId: string

    constructor(token: number, clientId: string) {
        this.token = token;
        this.clientId = clientId;
    }

    /*public static globalCommand() : void {

    }

    public static guildCommand() : void {

    }


    public static deleteGuildCommand() : void {

    }

    public deleteGlobalCommand() : void {

    }
    */
    public static deleteAllGuILDCommand(guildId:string): void {
        let url : string;
        const rest = new REST({ version: '8' }).setToken(process.env.TOKEN);
        rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId))
            .then(data => {
                let nb=0;
                data.forEach(command => {
                    url = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
                    rest.delete(url);
                    nb++
                })
                console.log(`${nb} ficher supprimer sur ${data.length}`)
            })
    }

    public static deleteAllGlobalDCommand(): void {
        let url : string;
        const rest = new REST({ version: '8' }).setToken(process.env.TOKEN);
        rest.get(Routes.applicationCommands(process.env.CLIENT_ID))
            .then(data => {
                let nb=0;
                data.forEach(command => {
                    url = `${Routes.applicationCommands(process.env.CLIENT_ID)}/${command.id}`;
                    rest.delete(url);
                    nb++
                })
                console.log(`${nb} ficher supprimer sur ${data.length}`)
            })
    }

    public static getGlobalCommand() : void {
        const rest = new REST({ version: '8' }).setToken(process.env.TOKEN);
        rest.get(Routes.applicationCommands(process.env.CLIENT_ID))
            .then(data => {
                if(data.length===0) {
                    console.log('Acune commandes globale créeer')
                } else {
                    console.log(data)
                }
            })
    }
}


/*public static deleteAllGuildCommands(guildID: string) : void {
    let url:string;
    const rest = new REST({ version: '8' }).setToken(process.env.TOKEN);
   console.log(rest.get(Routes.applicationGuildCommands(process.env["CLIENT_ID "], guildID)))

            let nb = 0;
            data.forEach(command => {
                url = `${Routes.applicationGuildCommands(process.env["CLIENT_ID "], guildID)}/${command.id}`;
                rest.delete(<RouteLike>url);
                nb++;
            })
            console.log(`${nb} commands supprimer sur ${data.length}`)



}
*/

