'use client'

import Image from "next/image"

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      <div className="relative h-24 w-24 mb-8">
        <Image
          src="https://res.cloudinary.com/dluyrdk80/image/upload/v1737567517/tanzania-police-seeklogo_yayz54.png"
          alt="Tanzania Police Logo"
          width={96}
          height={96}
          className="object-contain "
          priority
        />
      </div>
      <h1 className="text-4xl font-bold text-center mt-8">Accident Detection System</h1>
    </div>
  )
}

