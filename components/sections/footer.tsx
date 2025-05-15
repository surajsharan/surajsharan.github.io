export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-gray-100 text-neutral-900">
      <div className="container mx-auto px-4 text-center">
        <p className="text-neutral-600">© {currentYear} Suraj Sharan. All rights reserved.</p>
        <p className="text-sm mt-2 text-neutral-500">Built with Next.js, Tailwind CSS, and Neural Networks</p>
      </div>
    </footer>
  )
}
