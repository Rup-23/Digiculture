"use client";
import Link from "next/link";
import React from "react";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full max-w-4xl p-8 py-24 mx-auto md:bg-transparent bg-white shadow-xl md:shadow-none rounded-lg">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Have questions? Fill out the form below, and we'll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <form action="https://formsubmit.co/rupesh115511@gmail.com" method="POST" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center w-full md:w-1/2 bg-gray-50 p-3 rounded-lg border border-gray-300 shadow-sm">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center w-full md:w-1/2 bg-gray-50 p-3 rounded-lg border border-gray-300 shadow-sm">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Enter your message"
          required
          className="w-full bg-gray-50 p-3 rounded-lg outline-none text-gray-700 h-32 resize-none border border-gray-300 shadow-sm"
        ></textarea>

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          <FaPaperPlane className="mr-2" /> Send Message
        </button>
      </form>

      {/* Google Map */}
      <div className="mt-12 w-full h-64 overflow-hidden rounded-lg shadow-md border border-gray-300">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092723!2d144.95373531531812!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1c94b5f%3A0xbde8ef08c4c7f904!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1622591198837!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Join Us Section */}
      <div className="w-full max-w-7xl text-center mt-16 mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Join Us in Uncovering History</h2>
        <p className="text-lg text-gray-600 mb-6">
          Share your own untold stories and contribute to a global collection of hidden narratives.
        </p>
      

<Link href="/stories/form">
          <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
          Share Your Story
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Contact;
