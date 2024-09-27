
import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries } from '@/app/actions';
import { Country } from '@/interfaces';

const ShippingAddressPage = async () => {

  const countries: Country[] = await getCountries();
  
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries}/>       
      </div>
    </div>
  );
}

export default ShippingAddressPage