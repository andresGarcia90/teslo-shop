'use client';
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import clsx from "clsx";
import { login, registerUser } from "@/app/actions";
import { useState } from "react";


type IFormInput = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;
    console.log({name, email, password});
    const resp = await registerUser(name, email, password);
    if(!resp.ok){
      setErrorMessage(resp.message);
    }

    await login(email.toLocaleLowerCase(), password);
    window.location.replace('/');

    
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
         className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.name
            }
          )
        }
        autoFocus
        type="text"
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.email
            }
          )
        }
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': errors.password
            }
          )
        }
        type="password"
        {...register("password", { required: true })}
      />
      <span className="text-red-500">{ errorMessage } </span>
      <button className="btn-primary">Create Account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Enter
      </Link>
    </form>
  );
};
