"use client";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


// type FormInput = {
//   firstName: string
//   lastName: string
//   address: string
//   address2?: string
//   city: string
//   country: string
//   phone: string
//   rememberAddress: boolean
// }


const AddressSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  address: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  address2: z.string().optional(),
  costalCode: z.string().length(4).regex(/^\d+$/, 'Phone number must contain only numbers'),
  city: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  country: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  phone: z.string().length(10).regex(/^\d+$/, 'Phone number must contain only numbers'),
  rememberAddress: z.boolean(),
});

type SignUpSchemaType = z.infer<typeof AddressSchema>;



export const AddressForm = () => {
  const { handleSubmit, register, formState: { errors, isValid } } = useForm<SignUpSchemaType>({ resolver: zodResolver(AddressSchema) });

  const onSubmitForm = (data: SignUpSchemaType) => {
    console.log("HANDLE FORM");


    console.log(data, errors, isValid);

  }

  return (
    <form className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2" onSubmit={handleSubmit(onSubmitForm)}>

      <div className="flex flex-col mb-2">
        <span>First Name</span>
        <input
          {...register('firstName')}
          type="text"
          className="p-2 border rounded-md bg-gray-200"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

      </div>

      <div className="flex flex-col mb-2">
        <span>Last Name</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('lastName')}
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

      </div>

      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('address')}
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}

      </div>

      <div className="flex flex-col mb-2">
        <span>Address 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('address2')}
        />
        {errors.address2 && <p className="text-red-500">{errors.address2.message}</p>}

      </div>


      <div className="flex flex-col mb-2">
        <span>CP</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('costalCode')}
        />
        {errors.costalCode && <p className="text-red-500">{errors.costalCode.message}</p>}

      </div>

      <div className="flex flex-col mb-2">
        <span>City</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('city')}

        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}

      </div>

      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register('country')}
        >
          <option value="">[ Seleccione ]</option>
          <option value="CRI">Costa Rica</option>
          <option value="ARG">Argentina</option>
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Phone</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('phone')}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="inline-flex items-center mb-5 col-span-2">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor="checkbox"
        >
          <input
            type="checkbox"
            className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
            id="checkbox"
            {...register('rememberAddress')}
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <label>Remember Address</label>
        {errors.rememberAddress && <p className="px-2 text-red-500">{errors.rememberAddress.message}</p>}
      </div>



      <div className="flex  justify-end mb-2 sm:mt-10 col-span-2">
        <button
          type='submit'
          className="btn-primary flex w-full sm:w-1/2 justify-center ">
          Next
        </button>
      </div>


    </form>
  )
}
