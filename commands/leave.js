module.exports = {
    name: 'leave',
    execute(interaction)  {

        const connection = interaction.client.connection;

        if(!connection || connection._state.status==='destroyed') {
            return interaction.reply('Je suis pas dans un salon vocal.');
        }
        else {

            const queue = interaction.client.queue;
            queue.delete(interaction.client.queue);
            connection.destroy()
            return interaction.reply(':pray:');
        }
    }

}
