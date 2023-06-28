import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommand } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import envArray from "@util/env-array";
import { ApplicationCommand } from "discord.js";

export class CommandsCommand extends Subcommand {
  public constructor(context: Subcommand.Context, options: Subcommand.Options) {
    super(context, {
      ...options,
      preconditions: ['OwnerOnly'],
      subcommands: [
        {
          name: "list",
          chatInputRun: "list",
          default: true,
        },
        {
          name: "delete",
          chatInputRun: "delete",
        }
      ],
    });
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName("commands")
          .setDescription("DEVELOPER ONLY: Utility for slash commands")
          .addSubcommand((subcmd) =>
            subcmd
              .setName("list")
              .setDescription("Lists all slash commands")
              .addStringOption((option) =>
                option
                  .setName("guild")
                  .setDescription("Guild ID of the guild to list commands for (if not provided, will list global commands)")
                  .setRequired(false)
              )
          )
          .addSubcommand((subcmd) =>
            subcmd
              .setName("delete")
              .setDescription("Deletes a slash command")
              .addStringOption((option) =>
                option
                  .setName("command")
                  .setDescription("Command ID of the command to delete")
                  .setRequired(true)
              )
              .addStringOption((option) =>
                option
                  .setName("guild")
                  .setDescription("Guild ID of the guild to delete the command from (if not provided, will delete global command)")
                  .setRequired(false)
              )
          ),
      { guildIds: envArray('GUILD_IDS') }, // Uncomment this line to register the command in a specific guild
    );
  }

  public async list(interaction: Subcommand.ChatInputCommandInteraction) {

    var commands: ApplicationCommand[] = [];
    
    if (interaction.options.getString('guild')) {
      await this.container.client.guilds.cache.get(interaction.options.getString('guild')!)?.commands.fetch().then((cmds) => {
        cmds.forEach((cmd) => {
          commands.push(cmd);
        });
      });
    } else {
      await this.container.client.application?.commands.fetch().then((cmds) => {
        cmds.forEach((cmd) => {
          commands.push(cmd);
        });
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Slash Commands")

    if (interaction.options.getString('guild')) {
      embed.setDescription(`List of slash commands for guild ${interaction.options.getString('guild')}`)
    } else {
      embed.setDescription(`List of global slash commands`)
    }

    commands.forEach((cmd) => {
      embed.addFields({
        name: cmd.name,
        value: cmd.description + `\nID: ${cmd.id}`,
        inline: true,
      });

      
    });
    interaction.reply({ embeds: [embed] });
  }

  public async delete(interaction: Subcommand.ChatInputCommandInteraction) {

    if (interaction.options.getString('guild')) {
      await this.container.client.guilds.cache.get(interaction.options.getString('guild')!)?.commands.delete(interaction.options.getString('command')!);
      interaction.reply({ content: `Deleted guild command \`${interaction.options.getString('command')}\` in guild ${interaction.options.getString('guild')}` });
      console.log(`Deleted guild command ${interaction.options.getString('command')} in guild ${interaction.options.getString('guild')}`);
    } else {
      await this.container.client.application?.commands.delete(interaction.options.getString('command')!);
      interaction.reply({ content: `Deleted global command \`${interaction.options.getString('command')}\`` });
      console.log(`Deleted global command ${interaction.options.getString('command')}`);
    }


  }
}
