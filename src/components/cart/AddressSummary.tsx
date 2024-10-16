import { Address } from '@/interfaces'

export const AddressSummary = ({address}: {address: Address}) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl mb-2">Shipping Address</h2> 
      <p className="text-xl">{address.firstName} {address.lastName}</p>
      <p>{address.address}</p>
      <p>{address.city}</p>
      <p>{address.country}</p>
      <p>CP: {address.postalCode}</p>
      <p>Phone: {address.phone}</p>
    </div>
  )
}