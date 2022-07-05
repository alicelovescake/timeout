import { Authenticator } from 'remix-auth'
import { createCookieSessionStorage } from '@remix-run/node'
import type { TwitterProfile } from 'remix-auth-twitter'
import { TwitterStrategy } from 'remix-auth-twitter'

import { db } from '~/utils/db.server'
import type { User } from '@prisma/client'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET ?? ''],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const authenticator = new Authenticator<User>(sessionStorage)

const clientID = process.env.TWITTER_CONSUMER_KEY
const clientSecret = process.env.TWITTER_CONSUMER_SECRET

if (!clientID || !clientSecret) {
  throw new Error(
    'TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET must be provided'
  )
}

authenticator.use(
  new TwitterStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: 'http://localhost:3000/login/callback',
      includeEmail: true,
    },
    async ({ accessToken, accessTokenSecret, profile }) =>
      registerUser(accessToken, accessTokenSecret, profile)
  ),
  'twitter'
)

async function registerUser(
  accessToken: string,
  accessTokenSecret: string,
  profile: TwitterProfile
) {
  const data = {
    twitterId: profile.id_str,
    handle: profile.screen_name,
    email: profile.email,
    name: profile.name,
    profileImageURL: profile.profile_image_url,
    accessToken,
    accessTokenSecret,
  }

  const user = await db.user.findUnique({
    where: { twitterId: profile.id_str },
  })

  if (user) {
    return await db.user.update({ data, where: { twitterId: profile.id_str } })
  }

  return await db.user.create({
    data,
  })
}

export async function getAuthUserId(
  request: Request
): Promise<User['id'] | undefined> {
  const user = await authenticator.isAuthenticated(request)
  return user?.id
}
