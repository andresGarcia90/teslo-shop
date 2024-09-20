import { titleFont } from '@/config/fonts'

const NewAccountPage = () => {
  return (
    <div className="flex justify-center sm:w[500px] w-full">
      <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>New Account</h1>

      <div className="flex flex-col">


        <label htmlFor="email">Name</label>
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            type="text" />

        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />


        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password" />
        <button
          className="btn-primary">
          Create New Account
        </button>
      </div>
    </div>
    </div>
   )
}

export default NewAccountPage