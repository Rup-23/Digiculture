"use client";
import Link from "next/link";
import React from "react";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-gray-200 px-6 py-24">
      <h1 className="text-5xl font-extrabold text-center text-gold-500 mb-6 tracking-wide drop-shadow-lg text-[#FFD700]">
        Contact The Digital Museum
      </h1>
      <p className="text-lg text-center text-gray-400 max-w-2xl mb-10">
        Have questions or want to contribute? Fill out the form below, and our team will reach out to you soon.
      </p>

      {/* Contact Form */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <form
          action="https://formsubmit.co/rupesh115511@gmail.com"
          method="POST"
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center w-full md:w-1/2 bg-gray-800 p-3 rounded-lg border border-gray-700">
              <FaUser className="text-gold-500 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center w-full md:w-1/2 bg-gray-800 p-3 rounded-lg border border-gray-700">
              <FaEnvelope className="text-gold-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
              />
            </div>
          </div>

          <textarea
            name="message"
            placeholder="Enter your message"
            required
            className="w-full bg-gray-800 p-3 rounded-lg outline-none text-gray-200 h-32 resize-none border border-gray-700 placeholder-gray-400"
          ></textarea>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-[#FFD700] text-gray-900 font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div className="mt-12 w-full max-w-3xl h-64 overflow-hidden rounded-lg shadow-lg border border-gray-700">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092723!2d144.95373531531812!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1c94b5f%3A0xbde8ef08c4c7f904!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1622591198837!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Join Us Section */}
      <div className="w-full max-w-4xl text-center mt-16 mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gold-500">Join The Digital Museum Community</h2>
        <p className="text-lg text-gray-400 mb-6">
          Share your own untold stories and contribute to a global collection of hidden narratives.
        </p>
        <Link href="/stories/form">
            <button className="bg-[#FFD700] text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              Share Your Story
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Contact;
