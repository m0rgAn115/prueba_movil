import React, { useState } from "react";
import Flecha from "../components/Flecha";

export default function Operaciones() {
    return (
        <>
            <main className="h-[100vh] flex flex-col w-screen max-w-screen bg-gradient-to-r from-[#EB0029] to-[#B2001F] pt-3">
                {/* Header */}
                <div className="flex justify-between px-[41px] my-5">
                    <a href="/" className="font-bold text-[16px] text-white text-center">
                        <span className="flex flex-row items-center">
                            <Flecha />
                            <span className="pl-2 font-semibold text-xl">
                                Atras
                            </span>
                        </span>
                    </a>

                    <p className="tracking-tight font-extrabold text-white">
                        <button className="font-normal text-3xl">
                            Operaciones
                        </button>
                    </p>
                </div>

                {/* Body */}
                <section className="bg-white pt-8 rounded-t-3xl px-[41px] flex-grow shadow-sm">
                    <div className="grid grid-cols-2 gap-x-7 gap-y-10 mt-10">
                        <a href="/" className="bg-gray-50 shadow-md shadow-gray-400 rounded-xl flex flex-col justify-center items-center p-6 hover:bg-gray-100 transition">
                            <svg className="text-red-600 h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="#EB0029" d="M21.66 10.37a.6.6 0 0 0 .07-.19l.75-4a1 1 0 0 0-2-.36l-.37 2a9.22 9.22 0 0 0-16.58.84a1 1 0 0 0 .55 1.3a1 1 0 0 0 1.31-.55A7.08 7.08 0 0 1 12.07 5a7.17 7.17 0 0 1 6.24 3.58l-1.65-.27a1 1 0 1 0-.32 2l4.25.71h.16a.9.9 0 0 0 .34-.06a.3.3 0 0 0 .1-.06a.8.8 0 0 0 .2-.11l.08-.1a1 1 0 0 0 .14-.16a.6.6 0 0 0 .05-.16m-1.78 3.7a1 1 0 0 0-1.31.56A7.08 7.08 0 0 1 11.93 19a7.17 7.17 0 0 1-6.24-3.58l1.65.27h.16a1 1 0 0 0 .16-2L3.41 13a.9.9 0 0 0-.33 0H3a1.2 1.2 0 0 0-.32.14a1 1 0 0 0-.18.18l-.09.1a1 1 0 0 0-.07.19a.4.4 0 0 0-.07.17l-.75 4a1 1 0 0 0 .8 1.22h.18a1 1 0 0 0 1-.82l.37-2a9.22 9.22 0 0 0 16.58-.83a1 1 0 0 0-.57-1.28"/>  
                            </svg>
                        <p className="text-center font-semibold text-md">Transferir</p>
                        </a>

                        <a href="/" className="bg-gray-50 shadow-md shadow-gray-400 rounded-xl flex flex-col justify-center items-center p-6 hover:bg-gray-100 transition">
                            <svg className="text-red-600 h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="#EB0029" d="M20 15h-2v-2h2c.55 0 1 .45 1 1s-.45 1-1 1m0 4h-2v-2h2c.55 0 1 .45 1 1s-.45 1-1 1m-6-7c-1.1 0-2 .9-2 2h-2v4h2c0 1.1.9 2 2 2h3v-8z"/><path fill="currentColor" d="M4 5c0 .55.45 1 1 1h3.5c.83 0 1.5.67 1.5 1.5S9.33 9 8.5 9H7c-2.21 0-4 1.79-4 4s1.79 4 4 4h2v-2H7c-1.1 0-2-.9-2-2s.9-2 2-2h1.5c1.93 0 3.5-1.57 3.5-3.5S10.43 4 8.5 4H5c-.55 0-1 .45-1 1"/>
                            </svg>
                        <p className="text-center font-semibold text-md">Pago Servicios</p>
                        </a>

                        <a href="/" className="bg-gray-50 shadow-md shadow-gray-400 rounded-xl flex flex-col justify-center items-center p-6 hover:bg-gray-100 transition">
                            <svg className="text-red-600 h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="#EB0029" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-11v6h2v-6zm0-4v2h2V7z"/>
                            </svg>
                            <p className="text-center font-semibold text-md">Consultas</p>
                        </a>

                        <a href="/" className="bg-gray-50 shadow-md shadow-gray-400 rounded-xl flex flex-col justify-center items-center p-6 hover:bg-gray-100 transition">
                            <svg className="text-red-600 h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                <path fill="#EB0029" d="M31.453 4.625A6.8 6.8 0 0 0 27.385.562c-1.745-.563-3.333-.563-6.557-.563h-9.682c-3.198 0-4.813 0-6.531.531A6.8 6.8 0 0 0 .547 4.613C0 6.347 0 7.946 0 11.144v9.693c0 3.214 0 4.802.531 6.536a6.8 6.8 0 0 0 4.068 4.063c1.734.547 3.333.547 6.536.547h9.703c3.214 0 4.813 0 6.536-.531a6.8 6.8 0 0 0 4.078-4.078c.547-1.734.547-3.333.547-6.536v-9.667c0-3.214 0-4.813-.547-6.547zm-8.224 6.177l-1.245 1.24a.67.67 0 0 1-.891.01a6.7 6.7 0 0 0-4.292-1.573c-1.297 0-2.589.427-2.589 1.615c0 1.198 1.385 1.599 2.984 2.198c2.802.938 5.12 2.109 5.12 4.854c0 2.99-2.318 5.042-6.104 5.266l-.349 1.604a.65.65 0 0 1-.635.516h-2.391l-.12-.01a.67.67 0 0 1-.505-.786l.375-1.693a8.75 8.75 0 0 1-3.844-2.094v-.016a.64.64 0 0 1 0-.906l1.333-1.292a.66.66 0 0 1 .896 0a6.45 6.45 0 0 0 4.521 1.76c1.734 0 2.891-.734 2.891-1.896s-1.172-1.464-3.385-2.292c-2.349-.839-4.573-2.026-4.573-4.802c0-3.224 2.677-4.797 5.854-4.943l.333-1.641a.64.64 0 0 1 .641-.51h2.37l.135.016a.64.64 0 0 1 .495.76l-.359 1.828a10 10 0 0 1 3.302 1.849l.031.031c.25.266.25.667 0 .906z"/>
                            </svg>
                            <p className="text-center font-semibold text-md">Estado Cuenta</p>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}