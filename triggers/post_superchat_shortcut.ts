import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { PostSuperChat } from "../workflows/post_superchat.ts";

export const PostSuperChatShortCut = DefineTrigger("post_superchat_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "SuperChat",
  description: "ｽﾊﾟﾁｬ",
})
  .runs(PostSuperChat)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
    user: ctx.data.user_id,
  }));
