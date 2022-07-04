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
    <div className="max-w-4xl mx-auto py-8 font-mono">
      <div className="text-center">
        <div className="relative flex justify-center items-center">
          <div className="uppercase font-bold text-8xl py-2 px-4 space-x-4 border-2 border-black">
            <span>t</span>
            <span>i</span>
            <span>m</span>
            <span>e</span>
          </div>
          <div className="uppercase font-bold text-8xl text-brand-white bg-black border-2 border-black py-2 px-4 space-x-4">
            <span>0</span>
            <span>u</span>
            <span>t</span>
          </div>
        </div>

        <p className="font-bold mt-2">
          Temporarily ban or mute the worst of Twitter.
        </p>
      </div>

      <div className="mt-12">
        {user ? (
          <>
            <div className="border-2 border-black p-8 space-y-8">
              <div className="flex space-x-4">
                <div className="relative w-12 h-12">
                  <img
                    src={user.profileImageURL}
                    alt="profile-pic"
                    className="border-2 border-black w-12 h-12 absolute -ml-0.5 -mt-0.5 z-10"
                  />
                  <div className="bg-black w-12 h-12 absolute"></div>
                </div>

                <div>
                  <p>
                    Howdy{' '}
                    <a
                      href={`https://twitter.com/${user.handle}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold hover:line-through decoration-2"
                    >
                      @{user.handle}
                    </a>
                    .
                  </p>
                  <p>You've put {timeouts.length} people in a timeout.</p>
                </div>
              </div>

              {timeouts.length > 0 && (
                <div>
                  <h2>These folks are in a timeout...</h2>
                </div>
              )}
            </div>

            <Form
              method="post"
              action="/logout"
              className="flex justify-end items-center"
            >
              <button className="p-2 font-bold hover:line-through decoration-2">
                Log out
              </button>
            </Form>
          </>
        ) : (
          <Form
            method="post"
            action="/login"
            className="relative flex justify-center"
          >
            <button className="absolute w-max z-10 bg-brand-white -ml-2.5 -mt-2 hover:-ml-3 hover:-mt-2.5 font-bold p-4 border-2 border-black transition-all ease-in-out">
              Log in with Twitter
            </button>

            <div className="absolute bg-black p-4 w-max transition-colors ease-in-out">
              Log in with Twitter
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}
