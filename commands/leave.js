module.exports = {
    name: 'leave',
    execute(interaction) {

        const connection = interaction.client.connection;
        const queue = interaction.client.queue;
        connection.destroy();
        queue.delete(interaction.client.queue);
        interaction.reply(':pray:');
    }

}
