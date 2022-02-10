import { DefineTable, Schema } from "slack-cloud-sdk/mod.ts";

export const SuperChats = DefineTable("super_chats", {
  primary_key: "id",
  columns: {
    id: {
      type: Schema.types.string,
    },
    user_id: {
      type: Schema.slack.types.user_id,
    },
    price: {
      type: Schema.types.number,
    },
  },
});
