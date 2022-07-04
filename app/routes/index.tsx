import type { LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import type { User, Timeout } from '@prisma/client'
import { authenticator } from '~/server/auth.server'
import { db } from '~/utils/db.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const timeouts = await db.timeout.findMany({ where: { userId: user?.id } })

  return { user, timeouts }
}

type LoaderData = {
  user: User | null
  timeouts: Timeout[] | []
}

export default function Index() {
  const { user, timeouts } = useLoaderData<LoaderData>()

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 font-mono">
      <div className="text-center">
        <h1 className="uppercase tracking-widest font-bold text-8xl">
          timeout
        </h1>

        <p className="font-bold">
          Temporarily ban or mute the worst of Twitter.
        </p>
      </div>

      <div>
        {user ? (
          <>
            <div className="border border-black rounded-xl p-8 space-y-8">
              <div className="flex space-x-4">
                <img
                  src={user.profileImageURL}
                  alt="profile-pic"
                  className="rounded-xl border border-black w-12 h-12"
                />

                <div>
                  <h2>Howdy {user.name}, let's put some folks in a timeout!</h2>
                </div>
              </div>

              {timeouts.length > 0 && (
                <div>
                  <h2>These folks are in a timeout...</h2>
                </div>
              )}
            </div>

            <Form method="post" action="/logout" className="text-right mt-2">
              <button>Log out</button>
            </Form>
          </>
        ) : (
          <div className="flex justify-center">
            <Form method="post" action="/login">
              <button className="hover:bg-brand-blue hover:-mt-2 font-bold p-8 rounded-xl border border-black">
                Login with Twitter
              </button>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}
