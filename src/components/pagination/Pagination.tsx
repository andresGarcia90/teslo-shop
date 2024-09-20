import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  currentPage?: number;
  totalPages?: number;
}
export const Pagination = ({ currentPage = 1, totalPages = 5 }: Props) => {
  const arrayOfNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  console.log(arrayOfNumbers);

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className={clsx("page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 focus:shadow-none",
                currentPage === 1 && 'text-gray-500 hover:cursor-default disabled pointer-events-none',
                currentPage !== 1 && 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
              )}
              href={`/?page=${currentPage - 1}`}
              aria-disabled={currentPage <= 1}
             
            >
              Previous
            </Link>
          </li>
          {arrayOfNumbers.map((number) => (
            <li className="page-item" key={number}>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 mx-2 rounded border-0 outline-none transition-all duration-300 focus:shadow-none',
                  number === currentPage && 'bg-blue-600 text-white hover:bg-blue-300',
                  number !== currentPage && 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200'

                )}
                href={`/?page=${number}`}
              >
                {number}
              </Link>
            </li>
          ))}

          {/*           
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              1
            </a>
          </li>
          <li className="page-item active">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
            >
              2 <span className="visually-hidden"></span>
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              3
            </a>
          </li> */}
          <li className="page-item">
            <Link
              className={clsx("page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 focus:shadow-none",
                currentPage === totalPages && 'text-gray-500 hover:cursor-default disabled pointer-events-none',
                currentPage !== totalPages && 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
              )}
              href={`/?page=${currentPage + 1}`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
