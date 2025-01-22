import Image from "next/image"

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      <div className="relative h-24 w-24">
        <Image
          src="/placeholder.svg"
          alt="Tanzania Police Logo"
          width={96}
          height={96}
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold text-center">Accident Detection System</h1>
    </div>
  )
}

