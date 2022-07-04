import { Form } from "@remix-run/react";

export default function TimeoutContainer() {
  return (
    <div>
      <div>+ New Timeout</div>
      <Form method="post" action="/timeout">
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
    </div>
  );
}
