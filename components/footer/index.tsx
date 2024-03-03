import Link from "next/link";

export default function Footer() {
    return(
        <div className="text-white py-8 bg-gradient-to-b from-neutral-700 to-neutral-900">
            <div className="container mx-auto flex justify-between flex-col gap-3 md:flex-row">
                <div className="space-x-10">
                    <Link href="/">Home</Link>
                    <Link href="/">About us</Link>
                    <Link href="/">Services</Link>
                    <Link href="/">Contact</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Copyright. All Rights Reserved.</p>
            </div>
        </div>
    )
}