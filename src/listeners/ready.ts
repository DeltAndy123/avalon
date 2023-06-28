import { Listener, Events } from '@sapphire/framework';
import { Client } from 'discord.js';

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: Events.ClientReady,
    });
  }
  public run(client: Client) {
    const { username, id, discriminator } = client.user!;
    this.container.logger.info(`Successfully logged in as ${username}#${discriminator} (${id})`);
  }
}