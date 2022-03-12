export class CommandParams {
    private name : string
    private description : string
    constructor(name:string, description:string) {
        if(name.length>32) {
            throw 'Le nom doit être inférieur à 32 carateres.'
        } else {
            this.name=name;
            this.description=description;
        }
    }
}