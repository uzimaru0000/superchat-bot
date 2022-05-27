import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import type { SuperChatFunction } from "../manifest.ts";

type User = {
  profile: {
    display_name: string;
    image_48: string;
  };
};

const qs = (obj: { [key: string]: string | undefined }) =>
  Object.entries(obj).flatMap(([key, val]) =>
    val !== undefined ? [`${key}=${decodeURIComponent(val)}`] : []
  ).join("&");

const getSuperChatImg = async (
  name: string,
  icon: string,
  price: number,
  message?: string,
) => {
  const query = qs({
    name,
    icon,
    price: price.toString(),
    message,
  });

  const res = await fetch(
    `https://superchat-img.vercel.app/super-chat?${query}`,
  );
  const blob = await res.blob();

  return blob;
};

const superChat: SlackFunctionHandler<typeof SuperChatFunction.definition> =
  async ({ inputs, env, token }) => {
    const client = SlackAPI(token, {});

    const res = await client.users.info({
      user: inputs.user,
      pretty: 1,
    });

    if (!res.ok) {
      return {
        error: res.error ?? "",
      };
    }

    const user = res.user as User;

    const name = encodeURIComponent(user.profile.display_name);
    const icon = encodeURIComponent(user.profile.image_48);
    const price = inputs.price;
    const message = inputs.message;

    const file = await getSuperChatImg(name, icon, price, message);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", `￥${price}`);
    formData.append("channels", inputs.channel);
    formData.append(
      "initial_comment",
      `${decodeURIComponent(name)}さんがスーパーチャットしました`,
    );

    await fetch(`${env.SLACK_API_URL}files.upload`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    return {
      outputs: {},
    };
  };

export default superChat;
