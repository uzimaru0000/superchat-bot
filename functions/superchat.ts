import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";

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

export const SuperChat = DefineFunction(
  "superchat",
  {
    title: "SuperChat",
    description: "Post SuperChat!!",
    input_parameters: {
      required: ["price", "user", "channel"],
      properties: {
        price: {
          type: Schema.types.number,
          description: "Price of SuperChat",
        },
        message: {
          type: Schema.types.string,
          description: "SuperChat message",
        },
        user: {
          type: Schema.slack.types.user_id,
        },
        channel: {
          type: Schema.slack.types.channel_id,
        },
      },
    },
    output_parameters: {
      required: ["message"],
      properties: {
        message: {
          type: Schema.types.string,
        },
      },
    },
  },
  async ({ inputs, client }) => {
    const res = await client.call("users.info", {
      user: inputs.user,
      pretty: 1,
    });

    if (!res.ok) {
      return { imgUrl: "error" };
    }

    const user = res.user as User;

    const name = encodeURIComponent(user.profile.display_name);
    const icon = encodeURIComponent(user.profile.image_48);
    const price = inputs.price;
    const message = inputs.message;

    const query = qs({
      name,
      icon,
      price: price.toString(),
      message,
    });

    return {
      outputs: {
        message: `<https://superchat-img.vercel.app/super-chat?${query}|${
          decodeURIComponent(name)
        }さんがスーパーチャットしました>`,
      },
    };
  },
);
