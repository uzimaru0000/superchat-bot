import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { SuperChats } from "../tables/super_chats.ts";

export const GetSuperChatHistory = DefineFunction("get_superchat_history", {
  title: "get superchat history",
  input_parameters: {
    required: ["user"],
    properties: {
      user: {
        type: Schema.slack.types.user_id,
      },
    },
  },
  output_parameters: {
    required: ["sum"],
    properties: {
      sum: {
        type: Schema.types.number,
      },
    },
  },
}, async ({ inputs, client }) => {
  const tables = SuperChats.api(client);

  const res = await tables.query({
    expression: "#user_id = :user_id",
    expression_columns: { "#user_id": "user_id" },
    expression_values: { ":user_id": inputs.user },
  });

  const sum = res.rows.reduce((acc, x) => x.price + acc, 0);

  return {
    error: res.error,
    outputs: {
      sum,
    },
  };
});
