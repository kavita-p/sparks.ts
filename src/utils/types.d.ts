import { Client, Collection } from 'discord.js';

export interface commandData {
  name: String;
  description: String;
  options: Array<any>;
  default_permission: any;
  default_member_permissions: any;
  dm_permission: Boolean;
}

export interface botCommand {
  data: {
    [key: string]: commandData;
  };
}

export interface botClient extends Client {
  commands?: Collection<String, botCommand>;
}
