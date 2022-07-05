import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { getAuthUserId } from '~/services/auth.server'
import { createTimeout } from '~/services/timeout.server'

export type ActionData = {
  errors?: {
    handle?: string
    expiresAt?: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await getAuthUserId(request)
  if (!userId) {
    return json({ status: 401 })
  }

  const formData = await request.formData()
  const handle = formData.get('handle')
  const expiresAt = formData.get('expiresAt')

  if (typeof handle !== 'string' || handle.length === 0) {
    return json<ActionData>(
      { errors: { handle: 'Handle is required' } },
      { status: 400 }
    )
  }

  if (typeof expiresAt !== 'string' || expiresAt.length === 0) {
    return json<ActionData>(
      { errors: { expiresAt: 'Expires at is required' } },
      { status: 400 }
    )
  }

  await createTimeout({
    expiresAt: new Date(expiresAt),
    handle,
    userId,
  })

  return redirect('/')
}
