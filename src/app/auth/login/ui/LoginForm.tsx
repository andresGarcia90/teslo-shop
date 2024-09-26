'use client';
import { authenticate } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link'
import clsx from 'clsx';
import { IoInformationOutline } from 'react-icons/io5';
import { useEffect } from 'react';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  console.log(state);

  useEffect(() => {
    if ( state === 'Success' ) {
      // redireccionar
      // router.replace('/');
      window.location.replace('/');
    }

  },[state]);
  return (
      <form action={ dispatch } className='flex flex-col'>
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name='email' />


        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name='password' />

        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credentials are invalid.
            </p>
          </div>
        )}

        <LoginButton />


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
      </form>

  )
}

function LoginButton(){
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className={clsx('btn-primary', { 'btn-disabled': pending })}>
      {pending ? 'Loading...' : 'Enter'}
    </button>
)
}
