 import { titleFont } from '@/config/fonts'
import Link from 'next/link'
 
 const LoginPage = () => {
   return (
    <div className="flex justify-center sm:w[500px] w-full">
      <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Login</h1>

      <div className="flex flex-col">

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
          Enter
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">Or</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="btn-secondary text-center">
          Create new Account
        </Link>

      </div>
    </div>
    </div>
   )
 }
 
 export default LoginPage