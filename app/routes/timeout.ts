import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getAuthUserId } from "~/server/auth.server";
import { createTimeout } from "~/server/timeout.server";
import type { ActionData } from "~/components/TimeoutContainer";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("yoo3", formData);
  const handle = formData.get("handle");
  const expiresAt = formData.get("expiresAt");
  console.log("yoo4", handle, expiresAt);
  if (typeof handle !== "string" || handle.length === 0) {
    return json<ActionData>(
      { errors: { handle: "Handle is required" } },
      { status: 400 }
    );
  }

  if (typeof expiresAt !== "string" || expiresAt.length === 0) {
    return json<ActionData>(
      { errors: { expiresAt: "Expires at is required" } },
      { status: 400 }
    );
  }
  const userId = await getAuthUserId(request);
  console.log("yoo2", userId);
  return await createTimeout({
    expiresAt: new Date(expiresAt),
    handle,
    userId,
  });
};
