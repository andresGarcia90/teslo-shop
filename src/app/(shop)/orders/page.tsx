import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { Title } from '@/components';
import { getOrdersByUser } from '@/app/actions/order/get-orders-by-user';

const OrdersPage = async () => {

  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    return (<div>We could not get your orders</div>)
  }

  if (orders?.length === 0) {
    return (<div>We could not get your orders</div>)
  }


  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Order Name Reference
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                State
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>

            {
              orders!.map((order, index) =>
                <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.createdAt.toLocaleDateString('en-US')}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {
                      order.isPaid && <>
                        <IoCardOutline className="text-green-800" />
                        <span className='mx-2 font-bold text-green-800'>Paid</span>
                      </>
                    }

                    {
                      !order.isPaid && <>
                        <IoCardOutline className="text-red-800" />
                        <span className='mx-2 font-bold text-red-800'>Pending</span>
                      </>
                    }

                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={"/orders/" + order.id} className="hover:underline">
                      Ver orden
                    </Link>
                  </td>

                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrdersPage