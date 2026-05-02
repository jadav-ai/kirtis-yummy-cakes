import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/sections/footer"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-cream">
        <h1 className="font-serif italic text-[80px] md:text-[120px] text-dark-rose leading-none">
          404
        </h1>
        <p className="font-serif text-[24px] md:text-[32px] text-void mt-4">
          Oops! This cake has already been eaten.
        </p>
        <p className="text-muted mt-4 max-w-[400px]">
          The page you are looking for doesn't exist or has been moved to a more delicious location.
        </p>
        <Link
          href="/"
          className="mt-10 px-8 py-3 bg-champagne text-void rounded-full font-serif italic text-[18px] hover:bg-gold-light transition-colors"
        >
          Back to the Studio
        </Link>
      </main>
      <Footer />
    </>
  )
}
