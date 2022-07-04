import type { Timeout, User } from "@prisma/client";
import { db } from "~/utils/db.server";

export type { Timeout } from "@prisma/client";

export function getTimeoutListItems({ userId }: { userId: User["id"] }) {
  return db.timeout.findMany({
    where: { userId },
    orderBy: { expiresAt: "desc" },
  });
}

export function createTimeout({
  userId,
  handle,
  expiresAt,
}: Pick<Timeout, "handle" | "expiresAt"> & { userId: User["id"] }) {
  console.log("CREATE", userId, handle, expiresAt);
  return db.timeout.create({
    data: {
      handle,
      expiresAt,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
