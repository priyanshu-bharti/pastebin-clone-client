"use client";

import Link from "next/link";
import { useState } from "react";
import {
    RiQrCodeLine,
    RiReactjsLine,
    RiSmartphoneLine,
    RiSpyLine,
} from "react-icons/ri";

export default function Home() {
    const [pasteUrl, setPasteUrl] = useState<string>("");

    return (
        <main className="bg-base-100">
            <header className="container mx-auto px-4 grid md:grid-cols-2">
                <nav className="flex items-center justify-between md:col-span-2 py-4">
                    {/* Nav Start */}
                    <div className="flex gap-1 items-center">
                        <div className="h-12">
                            <img
                                src="logo-transparent.png"
                                alt="ShareSnip Logo"
                                className="h-full"
                            />
                        </div>
                        <a href="#" className="text-2xl font-bold text-white">
                            ShareSnip
                        </a>
                    </div>

                    {/* Nav End */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="btn btn-ghost font-normal text-white hover:text-primary hidden md:grid"
                        >
                            Features
                        </a>
                        <a
                            href="#"
                            className="btn btn-ghost font-normal text-white hover:text-secondary hidden md:grid"
                        >
                            Open Source
                        </a>
                        <a
                            href="#"
                            className="btn btn-ghost font-normal text-white hover:text-accent hidden md:grid"
                        >
                            Join us
                        </a>
                        <Link href="/redirect" className="btn btn-secondary">
                            Try ShareSnip, it's free!
                        </Link>
                    </div>
                </nav>

                {/* Left half */}
                <section className="pt-12 md:py-24 grid gap-8">
                    <div className="headings">
                        <h1 className="font-bold text-6xl text-white">Code,</h1>
                        <h1 className="font-bold text-6xl text-primary">
                            ShareSnip,
                        </h1>
                        <h1 className="font-bold text-6xl text-white">
                            Collaborate!
                        </h1>
                    </div>
                    <p className="text-white">
                        ShareSnip is a free, open-source, and, powerful platform
                        to share code snippets, <br /> and collaborate with your
                        teammates together.
                    </p>
                    <div className="flex items-end max-w-md gap-4">
                        <div className="form-control w-full">
                            <input
                                className="input input-bordered w-full"
                                onChange={(e) => setPasteUrl(e.target.value)}
                                placeholder="Paste shared link"
                                type="text"
                                value={pasteUrl}
                            />
                        </div>
                        <a
                            href={pasteUrl}
                            target="_blank"
                            className="btn btn-primary"
                        >
                            View Snippet
                        </a>
                    </div>
                </section>

                {/* Right half */}
                <section className="grid gap-8 min-h-[32rem] relative overflow-hidden">
                    <div className="mockup-phone absolute right-1/2 translate-x-1/2 md:right-0 md:translate-x-0 top-16">
                        <div className="camera"></div>
                        <div className="display">
                            <div className="artboard artboard-demo phone-1 bg-primary">
                                <img
                                    src="https://e1.pxfuel.com/desktop-wallpaper/272/670/desktop-wallpaper-panda-cute-android-real-panda-thumbnail.jpg"
                                    alt="Screenshot"
                                    className="grayscale"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </header>

            <section className="bg-white text-neutral">
                <div className="container mx-auto py-16 p-4 grid gap-4">
                    <div className="text-center space-y-2 pb-12">
                        <p className="text-sm uppercase tracking-widest font-bold text-primary">
                            Features
                        </p>
                        <h2 className="font-bold text-4xl">
                            Why choose ShareSnip?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-8">
                        <div className="card text-center items-center px-4">
                            <div className="grid place-items-center text-3xl text-accent-focus bg-accent p-2 bg-opacity-20 rounded-xl mb-4">
                                <RiReactjsLine />
                            </div>
                            <h4 className="font-bold mb-2">
                                Built with MERN Stack
                            </h4>
                            <p className="">
                                Built using modern web technology i.e, MERN
                                Stack, ensuring a great OSS contributing
                                experience
                            </p>
                        </div>
                        <div className="card text-center items-center px-4">
                            <div className="grid place-items-center text-3xl text-error bg-error p-2 bg-opacity-10 rounded-xl mb-4">
                                <RiSpyLine />
                            </div>
                            <h4 className="font-bold mb-2">
                                Anonymously share
                            </h4>
                            <p className="">
                                Share your code snippets anonymously. It makes
                                for quick and secure sharing with anyone.
                            </p>
                        </div>
                        <div className="card text-center items-center px-4">
                            <div className="grid place-items-center text-3xl text-warning bg-warning p-2 bg-opacity-10 rounded-xl mb-4">
                                <RiSmartphoneLine />
                            </div>
                            <h4 className="font-bold mb-2">
                                Need an app? We got it.
                            </h4>
                            <p className="">
                                We offer this web app as an installable app for
                                platforms such as iOS, Android, desktop and
                                more.
                            </p>
                        </div>
                        <div className="card text-center items-center px-4">
                            <div className="grid place-items-center text-3xl text-info bg-info p-2 bg-opacity-10 rounded-xl mb-4">
                                <RiQrCodeLine />
                            </div>
                            <h4 className="font-bold mb-2">
                                Quick links & QR Codes
                            </h4>
                            <p className="">
                                Easily share your code with anyone by generating
                                shareable links or QR codes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-white">
                <div className="container mx-auto py-16 p-4 grid gap-8 place-items-center">
                    <div className="text-center space-y-2">
                        <p className="text-sm uppercase tracking-widest font-bold text-primary">
                            Open Source
                        </p>
                        <h2 className="font-bold text-4xl">
                            Let's build this together!
                        </h2>
                    </div>

                    <div className="grid place-items-center text-center">
                        <p className="max-w-lg">
                            Collaborations and pull requests are highly
                            encouraged, as we believe in the power of the
                            community to build something extraordinary.
                        </p>
                    </div>

                    <button className="btn btn-primary">
                        Make a pull request on GitHub
                    </button>
                </div>
            </section>

            <section className="bg-secondary text-neutral">
                <div className="container mx-auto py-16 p-4 grid gap-8 place-items-center">
                    <div className="text-center space-y-2">
                        <p className="text-sm uppercase tracking-widest font-bold text-secondary-content">
                            Join Us
                        </p>
                        <h2 className="font-bold text-4xl capitalize">
                            Join the army, try ShareSnip today!
                        </h2>
                    </div>

                    <div className="grid place-items-center text-center">
                        <p className="max-w-lg">
                            Sign up or log in to start sharing, collaborating,
                            and coding together. Experience the simplicity and
                            power of ShareSnip - where the coding community
                            connects!
                        </p>
                    </div>

                    <button className="btn btn-neutral btn-lg text-secondary">
                        Try ShareSnip, its free!
                    </button>
                </div>
                <footer className="text-xs p-4 grid place-items-center border-t border-t-neutral">
                    Copyright © 2023. Developed with Next.js, MongoDB, and
                    Express in Incredible India.
                </footer>
            </section>
        </main>
    );
}
