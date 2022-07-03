import { LoaderFunction } from "@remix-run/node";
import { authenticator, User } from "~/server/auth.server";
import { Form, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return { user };
};
type LoaderData = {
  user: User | null;
};
export default function Index() {
  const { user } = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Twitter Timeout!!</h1>
      {user ? (
        <div>
          <h2>Hello{user.name}</h2>
          <img src={user.profile_image_url} alt="profile-pic" />
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
  );
}
