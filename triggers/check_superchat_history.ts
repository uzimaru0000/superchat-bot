import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { CheckSuperChat } from "../workflows/check_superchat.ts";

export const CheckSuperchatHistoryShortCut = DefineTrigger(
  "check_superchat_history",
  {
    type: TriggerTypes.Shortcut,
    name: "Check SuperChat history",
  },
)
  .runs(CheckSuperChat)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
    user: ctx.data.user_id,
  }));
