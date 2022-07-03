import type { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/server/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.authenticate("twitter", request, {
    successRedirect: "/",
    failureRedirect: "/login/failure",
  });
};
