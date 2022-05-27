import { DefineFunction, Manifest, Schema } from "deno-slack-sdk/mod.ts";

export const SuperChatFunction = DefineFunction({
  callback_id: "super-chat",
  title: "SuperChat",
  description: "Post SuperChat!!",
  source_file: "functions/superchat.ts",
  input_parameters: {
    required: ["price", "user", "channel"],
    properties: {
      price: {
        type: "number",
        description: "Price of SuperChat",
      },
      message: {
        type: Schema.types.string,
        description: "SuperChat message",
      },
      user: {
        type: Schema.slack.types.user_id,
        default: undefined,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
  },
});

export default Manifest({
  name: "SuperChat",
  description: "ｽﾊﾟﾁｬ",
  icon: "assets/icon.png",
  functions: [SuperChatFunction],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "users:read",
    "files:write",
  ],
});
