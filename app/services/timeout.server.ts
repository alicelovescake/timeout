import type { Timeout, User } from '@prisma/client'
import { db } from '~/utils/db.server'

export type { Timeout } from '@prisma/client'

export async function getTimeoutListItems({ userId }: { userId: User['id'] }) {
  return await db.timeout.findMany({
    where: { userId },
    orderBy: { expiresAt: 'desc' },
  })
}

export async function createTimeout({
  userId,
  handle,
  expiresAt,
}: Pick<Timeout, 'handle' | 'expiresAt'> & { userId: User['id'] }) {
  return await db.timeout.create({
    data: {
      handle,
      expiresAt,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}
