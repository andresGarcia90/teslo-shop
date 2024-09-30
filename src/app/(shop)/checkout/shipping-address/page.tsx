
import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/app/actions';
import { Country } from '@/interfaces';
import { auth } from '@/app/auth.config';

const ShippingAddressPage = async () => {
 
  const countries: Country[] = await getCountries();
  const session = await auth();
  
  if ( !session?.user ) {
    return <h3 className='text-5xl'>500: Session not found</h3>;
  }

  const {address: userAddress} = await getUserAddress(session.user.id);
  console.log({userAddress});
  

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoredAddress={userAddress}/>       
      </div>
    </div>
  );
}

export default ShippingAddressPage