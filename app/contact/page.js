"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  const [formFocus, setFormFocus] = useState({
    name: false,
    email: false,
    message: false
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-gray-200 px-6 py-28 relative">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMCAwTDYwIDBMMzAgNjAiIHN0cm9rZT0iI2Q0YWYzNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz4KPC9zdmc+')]"></div>

      {/* Decorative Elements */}
      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8"></div>
      
      <h1 className="text-5xl font-serif font-extrabold text-center mb-4 tracking-wide drop-shadow-lg">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#FFD700]">Contact</span> The Digital Museum
      </h1>
      
      <p className="text-lg text-center text-gray-400 max-w-2xl mb-2 font-light">
        Have questions or want to contribute? Fill out the form below, and our team will reach out to you soon.
      </p>
      
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-12 mt-4"></div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
        {/* Left Column - Contact Form */}
        <div className="flex-1">
          <div className="bg-black bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-gray-800">
            <h3 className="text-xl font-serif mb-6 flex items-center text-[#d4af37]">
              <span className="block w-4 h-px bg-[#d4af37] mr-2"></span>
              Share Your Inquiry
              <span className="block w-4 h-px bg-[#d4af37] ml-2"></span>
            </h3>
            
            <form
              action="https://formsubmit.co/rupesh115511@gmail.com"
              method="POST"
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className={`flex items-center w-full md:w-1/2 bg-gray-900 p-3 rounded-md ${formFocus.name ? 'border border-[#d4af37]' : 'border border-gray-700'} transition-all duration-300`}>
                  <FaUser className="text-[#d4af37] mr-3" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
                    onFocus={() => setFormFocus({...formFocus, name: true})}
                    onBlur={() => setFormFocus({...formFocus, name: false})}
                  />
                </div>
                <div className={`flex items-center w-full md:w-1/2 bg-gray-900 p-3 rounded-md ${formFocus.email ? 'border border-[#d4af37]' : 'border border-gray-700'} transition-all duration-300`}>
                  <FaEnvelope className="text-[#d4af37] mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
                    onFocus={() => setFormFocus({...formFocus, email: true})}
                    onBlur={() => setFormFocus({...formFocus, email: false})}
                  />
                </div>
              </div>

              <textarea
                name="message"
                placeholder="Enter your message"
                required
                className={`w-full bg-gray-900 p-4 rounded-md outline-none text-gray-200 h-40 resize-none ${formFocus.message ? 'border border-[#d4af37]' : 'border border-gray-700'} transition-all duration-300 placeholder-gray-500`}
                onFocus={() => setFormFocus({...formFocus, message: true})}
                onBlur={() => setFormFocus({...formFocus, message: false})}
              ></textarea>

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-medium py-3 px-6 rounded-md transition duration-300"
              >
                <FaPaperPlane className="mr-2" /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Info & Map */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Museum Info */}
          <div className="bg-black bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-gray-800">
            <h3 className="text-xl font-serif mb-6 flex items-center text-[#d4af37]">
              <span className="block w-4 h-px bg-[#d4af37] mr-2"></span>
              Museum Information
              <span className="block w-4 h-px bg-[#d4af37] ml-2"></span>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-700 mr-4">
                  <FaMapMarkerAlt className="text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Our Location</h4>
                  <p className="text-gray-400 mt-1">Milkiway Galaxy</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-700 mr-4">
                  <FaEnvelope className="text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <p className="text-gray-400 mt-1">contact@digitalmuseum.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-700 mr-4">
                  <FaPhoneAlt className="text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <p className="text-gray-400 mt-1">+91 000000-0000</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="bg-black bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-xl border border-gray-800 h-64">
            <iframe
              className="w-full h-full rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345092723!2d144.95373531531812!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1c94b5f%3A0xbde8ef08c4c7f904!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1622591198837!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="w-full max-w-4xl text-center mt-16 mx-auto">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8 mx-auto"></div>
        <h2 className="text-3xl font-serif font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#FFD700]">
            Join The Digital Museum Community
          </span>
        </h2>
        <p className="text-lg text-gray-400 mb-8 font-light">
          Share your own untold stories and contribute to a global collection of hidden narratives.
        </p>
        <Link href="/stories/form">
          <button className="bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-medium py-3 px-8 rounded-md shadow-md hover:shadow-xl transition-all duration-300">
            Share Your Story
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Contact;