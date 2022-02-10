import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { SuperChat } from "../functions/superchat.ts";
import { StoreSuperChat } from "../functions/store_superchat.ts";

export const PostSuperChat = DefineWorkflow("post_superchat", {
  title: "Post SuperChat",
  description: "Post SuperChat",
  input_parameters: {
    required: ["price"],
    properties: {
      price: {
        type: Schema.types.number,
        description: "Price of SuperChat",
      },
      message: {
        type: Schema.types.string,
        description: "SuperChat message",
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
  },
});

const genSuperChat = PostSuperChat.addStep(SuperChat, {
  user: PostSuperChat.inputs.user,
  price: PostSuperChat.inputs.price,
  message: PostSuperChat.inputs.message,
  channel: PostSuperChat.inputs.channel,
});

PostSuperChat.addStep(Schema.slack.functions.SendMessage, {
  channel_id: PostSuperChat.inputs.channel,
  message: genSuperChat.outputs.message,
});

PostSuperChat.addStep(StoreSuperChat, {
  user: PostSuperChat.inputs.user,
  price: PostSuperChat.inputs.price,
});
