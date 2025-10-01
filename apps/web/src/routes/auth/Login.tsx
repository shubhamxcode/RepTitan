import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/Login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition">
          Sign Up
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full flex items-center  gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition">
          <span className="text-xl">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#fff"/>
              <text x="50%" y="55%" textAnchor="middle" fontSize="12" fill="#4285F4" fontWeight="bold">G</text>
            </svg>
          </span>
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  )
}
