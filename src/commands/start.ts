import { Command, ChatInputCommand } from "@sapphire/framework";

export class StartCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      requiredUserPermissions: ["SendMessages"],
      requiredClientPermissions: ["SendMessages"],
    });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("start")
          .setDescription("Start a new game of The Resistance: Avalon")
      // { guildIds: [ 'TESTID' ] }, // Uncomment this line to register the command in a specific guild
    );
  }

  public chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    
  }
}
