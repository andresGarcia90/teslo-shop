import Link from "next/link";
import { AddressSummary } from "./AddressSummary";

interface Props {
  nextStep: string,
  next: string, 
  showAddress?: boolean
}
export const OrderSummary = ({nextStep, next, showAddress}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-7 grid grid-cols-1 place-content-between">
      {showAddress && 
        <>
          <AddressSummary />
          <div className="w-100 h-0.5 rounded bg-gray-200 mb-10" />
        </>
      }
      <h2 className="text-xl mb-2">Order Summary</h2>
      <div className="grid grid-cols-2">
        <span>empty</span>
        <span className="text-right">3 articles</span>
        <span>sub total</span>
        <span className="text-right">$ 1</span>
        <span>taxes</span>
        <span className="text-right">$ 10</span>
        <span className="mt-5 text-xl">Total</span>
        <span className="mt-5 text-xl text-right">$ 1</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <Link className="flex btn-primary justify-center" href={nextStep}>{next}</Link>
      </div>
    </div>
  );
};
