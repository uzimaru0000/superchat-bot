import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { GetSuperChatHistory } from "../functions/get_superchat_history.ts";

export const CheckSuperChat = DefineWorkflow("check_superchat", {
  title: "Check SuperChat",
  input_parameters: {
    required: [],
    properties: {
      user: {
        type: Schema.slack.types.user_id,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
  },
});

const { sum } = CheckSuperChat.addStep(GetSuperChatHistory, {
  user: CheckSuperChat.inputs.user,
}).outputs;

CheckSuperChat.addStep(Schema.slack.functions.SendEphemeralMessage, {
  channel_id: CheckSuperChat.inputs.channel,
  user_id: CheckSuperChat.inputs.user,
  message: `総スパチャ額は ￥${sum.toLocaleString()} です`,
});
