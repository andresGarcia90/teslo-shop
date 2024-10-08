'use client';
import { useEffect, useState } from "react";
import { useCartStore, useUIStore } from "@/store"
import Link from "next/link"
import { titleFont } from "@/config/fonts"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
  const { openSideMenu } = useUIStore();
  const { getTotalItems } = useCartStore();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [])

  const totalItems = getTotalItems();

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}> Teslo </span>
          <span>| Shop</span>
        </Link>
      </div>
      <div className="hidden md:block">
        <Link
         className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
         href="/category/men">
          Men
        </Link>
        <Link
         className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
         href="/category/women">
          Women
        </Link>
        <Link
         className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
         href="/category/kid">
          Kids
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            {(isLoading && totalItems > 0) && 
              <span className="absolute -top-3 -right-4 rounded-full text-white px-2 font-bold bg-blue-500">
                { totalItems }
              </span>
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button className="m-2 p-2 rounded-md tramsaition-all hover:bg-gray-100" onClick={()=> openSideMenu()}>Menu</button>
      </div>
    </nav>
  )
}
