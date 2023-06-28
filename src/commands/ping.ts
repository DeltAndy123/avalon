import { Command, ChatInputCommand } from '@sapphire/framework';

export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('ping')
        .setDescription('A ping command to test the discord bot')
    );
  }

  public chatInputRun(interaction: Command.ChatInputCommandInteraction) {

    // Respond with the latency of the bot
    return interaction.reply(`Pong! (${this.container.client.ws.ping}ms)`);
      
  }
}