import { Project } from "slack-cloud-sdk/mod.ts";
import { PostSuperChatShortCut } from "./triggers/post_superchat_shortcut.ts";
import { PostSuperChat } from "./workflows/post_superchat.ts";
import { SuperChat } from "./functions/superchat.ts";
// import the Reversals table and include it in the `tables` array
// below to store data via the Tables API
// import { Reversals } from "./tables/reversals.ts";

Project({
  name: "superchat",
  description:
    "A demo showing how to use Slack workflows, functions, and triggers",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "users:read",
    "files:write",
  ],
  functions: [SuperChat],
  workflows: [PostSuperChat],
  triggers: [PostSuperChatShortCut],
  tables: [],
  outgoingDomains: [],
});
