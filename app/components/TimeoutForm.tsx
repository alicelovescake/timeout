import { Form } from '@remix-run/react'

export default function TimeoutForm() {
  return (
    <Form method="post" action="/timeout" className="space-y-4">
      <div className="flex flex-col">
        <label className="font-bold" htmlFor="handle">
          Who do you want to put in timeout?
        </label>
        <input
          id="handle"
          name="handle"
          className="border-2 border-black p-2"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-bold" htmlFor="expiresAt">
          When should they be released?
        </label>
        <input
          id="expiresAt"
          name="expiresAt"
          type="datetime-local"
          className="border-2 border-black p-2"
        />
      </div>

      <div>
        <label className="font-bold">Ban or mute?</label>
        <div className="flex justify-between">
          <button
            type="submit"
            className="border-2 border-black p-2 mr-2 w-1/2 hover:bg-black hover:text-brand-white font-bold"
          >
            Ban
          </button>

          <button
            type="submit"
            className="border-2 border-black p-2 w-1/2 ml-2 hover:bg-black hover:text-brand-white font-bold"
          >
            Mute
          </button>
        </div>
      </div>
    </Form>
  )
}
