import type { LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import type { User } from '@prisma/client'
import { authenticator } from '~/server/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  return { user }
}

type LoaderData = {
  user: User | null
}

export default function Index() {
  const { user } = useLoaderData<LoaderData>()

  return (
    <div>
      <h1>Twitter Timeout!!</h1>
      {user ? (
        <div>
          <h2>Hello{user.name}</h2>
          <img src={user.profileImageURL} alt="profile-pic" />
          <p>You are logged in with Twitter</p>
          <p>
            <Form method="post" action="/logout">
              <button>Log out</button>
            </Form>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <Form method="post" action="/login">
              <button>Login with Twitter</button>
            </Form>
          </p>
        </div>
      )}
    </div>
  )
}
