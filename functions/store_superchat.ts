import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";
import { SuperChats } from "../tables/super_chats.ts";

export const StoreSuperChat = DefineFunction("store_superchat", {
  title: "store superchat history",
  input_parameters: {
    required: ["price", "user"],
    properties: {
      price: {
        type: Schema.types.number,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
  },
  output_parameters: {
    required: [],
    properties: {},
  },
}, async ({ inputs, client }) => {
  const tables = SuperChats.api(client);

  await tables.put({
    id: crypto.randomUUID(),
    user_id: inputs.user,
    price: inputs.price,
  });

  return {};
});
