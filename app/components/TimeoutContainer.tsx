import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getAuthUserId } from "~/server/auth.server";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { getTimeoutListItems } from "~/server/timeout.server";

type LoaderData = {
  timeoutListItems: Awaited<ReturnType<typeof getTimeoutListItems>>;
};

export type ActionData = {
  errors?: {
    handle?: string;
    expiresAt?: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getAuthUserId(request);
  const timeoutListItems = await getTimeoutListItems({ userId });
  return json<LoaderData>({ timeoutListItems });
};

export default function TimeoutContainer() {
  const data = useLoaderData() as LoaderData;
  // const actionData = useActionData() as ActionData;
  return (
    <div>
      <h1>Your timeouts</h1>
      <div>+ New Timeout</div>
      <Form method="post" action="/">
        <div>
          <label>
            <span>Handle: </span>
            <input name="handle" />
          </label>
        </div>

        <div>
          <label>
            <span>Expires at: </span>
            <input name="expiresAt" />
          </label>
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </Form>
      <div>
        {data.timeoutListItems?.length === 0 ? (
          <p>No timeouts yet</p>
        ) : (
          <ol>
            {data.timeoutListItems?.map((timeout) => (
              <li key={timeout.id}>
                `You blocked {timeout.handle} until {timeout.expiresAt}`
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
