import { titleFont } from '@/config/fonts'
import { RegisterForm } from './ui/RegisterForm'

const NewAccountPage = () => {
  return (
    <div className="flex justify-center sm:w[500px] w-full">
      <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>New Account</h1>

      <RegisterForm />
    </div>
    </div>
   )
}

export default NewAccountPage