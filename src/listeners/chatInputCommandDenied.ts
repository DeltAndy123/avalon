import { Listener, UserError, ChatInputCommandDeniedPayload, Events } from '@sapphire/framework';

export class ChatInputCommandDeniedListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: Events.ChatInputCommandDenied,
    });
  }
  public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
    return interaction.reply({ content: error.message, ephemeral: true });
  }
}