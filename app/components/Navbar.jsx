import React from 'react';
import Navbutton from './Navbutton';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-inherit px-11 py-8">
            <div className="flex items-center">
                <a href="/" className="flex text-2xl font-bold">
                    <svg width="51" height="51" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 47V4C1 2 1 1 3 1H18C20 1 20 3 20 4V47C20 49 20 50 18 50H3C1 50 1 49 1 47Z" fill="black" stroke="black" />
                        <path d="M22.4999 34.9998C21.9997 34.9996 22.4997 3.99958 22.4999 2.49979C22.5 1 24.5 1.99999 25.9999 2.49979C27.4997 2.99959 31.9999 4.99979 33.9999 6.99979C35.9999 8.99979 36.4999 10.9998 35.9999 11.9998C35.4999 12.9998 23 35 22.4999 34.9998Z" fill="black" />
                        <path d="M22.4999 42.4998C21.9999 42.4998 21.9999 41.9998 22.4999 40.9998C22.9999 39.9998 37.9997 14.4998 38.4999 13.4998C39 12.4998 40.5 12.4998 41.4999 13.4998C42.4997 14.4998 47 19.9998 47.4999 21.9998C47.9997 23.9998 48.5 27.4998 47.4999 27.9998C46.4997 28.4998 22.9999 42.4998 22.4999 42.4998Z" fill="black" />
                        <path d="M22.4999 47.9998V45.9998C22.4999 45.4998 47.4997 31.4998 48.4999 30.9998C49.5 30.4998 52 32.9998 51.9999 33.9998C51.9997 34.9998 51.9997 45.9998 51.9999 46.9998C52 47.9998 51.5 49.9998 49.9999 49.9998H21.9999C21.4999 49.9998 22.4999 48.4998 22.4999 47.9998Z" fill="black" />
                        <path d="M22.4999 34.9998C21.9997 34.9996 22.4997 3.99958 22.4999 2.49979C22.5 1 24.5 1.99999 25.9999 2.49979C27.4997 2.99959 31.9999 4.99979 33.9999 6.99979C35.9999 8.99979 36.4999 10.9998 35.9999 11.9998C35.4999 12.9998 23 35 22.4999 34.9998Z" stroke="black" />
                        <path d="M22.4999 42.4998C21.9999 42.4998 21.9999 41.9998 22.4999 40.9998C22.9999 39.9998 37.9997 14.4998 38.4999 13.4998C39 12.4998 40.5 12.4998 41.4999 13.4998C42.4997 14.4998 47 19.9998 47.4999 21.9998C47.9997 23.9998 48.5 27.4998 47.4999 27.9998C46.4997 28.4998 22.9999 42.4998 22.4999 42.4998Z" stroke="black" />
                        <path d="M22.4999 47.9998V45.9998C22.4999 45.4998 47.4997 31.4998 48.4999 30.9998C49.5 30.4998 52 32.9998 51.9999 33.9998C51.9997 34.9998 51.9997 45.9998 51.9999 46.9998C52 47.9998 51.5 49.9998 49.9999 49.9998H21.9999C21.4999 49.9998 22.4999 48.4998 22.4999 47.9998Z" stroke="black" />
                        <path d="M13 41.5C13 40 12 39 10.5 39C9 39 8 40 8 41.5C8 43 9 44 10.5 44C12 44 13 43 13 41.5Z" fill="white" stroke="white" />
                    </svg>
                    <span className="px-5 mr-2 text-4xl">paletteperfect</span>
                </a>
            </div>
            <div className="flex items-center space-x-6">
                <div className='items-center space-x-6 pr-5'>
                    <a href="/" className="hover:text-gray-600 text-xl hover:underline">Meet the team</a>
                    <a href="/" className="hover:text-gray-600 text-xl hover:underline">Example</a>
                    <a href="/" className="hover:text-gray-600 text-xl hover:underline">Github</a>
                </div>
                <Navbutton />
            </div>
        </nav>
    );
};

export default Navbar;