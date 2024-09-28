import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
  address: {
    firstName: string
    lastName: string
    address: string
    address2: string
    postalCode: string
    city: string
    country: string
    phone: string
    rememberAddress: boolean
  },
  setAddress: (address: State['address']) => void,
  getAddress: () => State['address'],
  clearAddress: () => void
}


export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        rememberAddress: false
      },
      setAddress: (address) => set({ address }),
      getAddress: () => get().address,
      clearAddress: () => set({ address: get().address })
    }),
    { name: 'address-storage' }
  )
)