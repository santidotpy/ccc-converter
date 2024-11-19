import Link from "next/link"
import { Github, Linkedin } from 'lucide-react'


const socials = [
    {
        name: "GitHub",
        url: process.env.NEXT_PUBLIC_GITHUB_URL,
        icon: <Github size={24} />
    },
    {
        name: "LinkedIn",
        url: process.env.NEXT_PUBLIC_LINKEDIN_URL,
        icon: <Linkedin size={24} />
    },
    {
        name: "Twitter",
        url: process.env.NEXT_PUBLIC_TWITTER_URL,
        icon: <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="24"
            height="24"
            fill="currentColor"
        >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
    },
];


export default function Footer() {
    return (
        <footer className="w-full py-2 border-t">
            <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center pt-1">
                <section className="flex flex-col items-center sm:flex-col">

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
                        © {new Date().getFullYear()} Currency Converter.
                    </p>

                </section>
                <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                    <div className="flex flex-row">
                        {socials.map((social) => (
                            <Link
                                key={social.name}
                                href={social.url as string}
                                className="text-gray-500 hover:text-white-700 mx-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center sm:flex-row justify-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-right mt-2">
                    Made with ❤️ by{" santidotpy "}
                </p>
            </div>
        </footer>
    )
}
