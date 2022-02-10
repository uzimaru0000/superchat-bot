import { Project } from "slack-cloud-sdk/mod.ts";
import { PostSuperChatShortCut } from "./triggers/post_superchat_shortcut.ts";
import { CheckSuperchatHistoryShortCut } from "./triggers/check_superchat_history.ts";
import { PostSuperChat } from "./workflows/post_superchat.ts";
import { CheckSuperChat } from "./workflows/check_superchat.ts";
import { SuperChat } from "./functions/superchat.ts";
import { StoreSuperChat } from "./functions/store_superchat.ts";
import { GetSuperChatHistory } from "./functions/get_superchat_history.ts";
import { SuperChats } from "./tables/super_chats.ts";

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
  ],
  functions: [SuperChat, StoreSuperChat, GetSuperChatHistory],
  workflows: [PostSuperChat, CheckSuperChat],
  triggers: [PostSuperChatShortCut, CheckSuperchatHistoryShortCut],
  tables: [SuperChats],
  outgoingDomains: [],
});
