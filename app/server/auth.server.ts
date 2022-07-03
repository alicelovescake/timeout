import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { TwitterStrategy } from "remix-auth-twitter";

export type User = {
  id: number;
  screen_name: string;
  name: string;
  profile_image_url: string;
  email?: string;
};

export let authenticator = new Authenticator<User>(sessionStorage);

const clientID = process.env.TWITTER_CONSUMER_KEY;
const clientSecret = process.env.TWITTER_CONSUMER_SECRET;

if (!clientID || !clientSecret) {
  throw new Error(
    "TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET must be provided"
  );
}

authenticator.use(
  new TwitterStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:3000/login/callback",
      includeEmail: true,
    },
    async ({
      profile: { id, screen_name, name, profile_image_url, email },
    }) => ({
      id,
      screen_name,
      name,
      profile_image_url,
      email,
    })
  ),
  "twitter"
);
