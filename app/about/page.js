



  "use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans"> {/* Modern font */}
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-50 via-blue-50 to-sky-50"> {/* Gradient background */}
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-wide drop-shadow-lg">
            Unheard Narratives
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Preserving the stories untold, celebrating the voices unheard. We are a digital museum dedicated to sharing the rich tapestry of human experience that often goes unseen in mainstream narratives.
          </p>
        </div>
      </section>

      {/* About Sections */}
      <section className="py-16 bg-gray-200 p-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Our Story */}
            <div className="md:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                We believe that history is not just made of grand events and famous figures, but also of the everyday lives, local cultures, myths, folklore, and personal journeys of ordinary people. These stories, often overlooked or forgotten, hold immense power to connect us to our past, understand our present, and shape our future. We created this digital museum to provide a platform for these narratives to be shared, explored, and preserved for generations to come. We are committed to uncovering and showcasing the hidden histories, real-life stories, and cultural richness that make up the vibrant mosaic of human experience.
              </p>
            </div>
            {/* Join Us */}
            <div className="md:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Join Us On This Journey</h2>
              <p className="text-gray-700 leading-relaxed">
                Become a part of our mission to amplify unheard voices. Whether you have a story to share, a passion for history, or simply a desire to learn more, we invite you to join our growing community. Explore our collection, contribute your own narratives, and help us build a more inclusive and comprehensive understanding of our shared past.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-200 p-5"> {/* Light gray background */}
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Authenticity</h3>
              <p className="text-gray-700 leading-relaxed">We are committed to presenting stories with integrity and respect, ensuring that every narrative is accurately represented and faithfully preserved.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Inclusivity</h3>
              <p className="text-gray-700 leading-relaxed">We celebrate the diversity of human experience and strive to create a platform that is accessible and welcoming to all voices, regardless of background or perspective.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Preservation</h3>
              <p className="text-gray-700 leading-relaxed">We are dedicated to safeguarding these invaluable stories for future generations, ensuring that they are not lost to time or forgotten by history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Share Your Story</h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
            Contribute your own untold narratives and help us expand the tapestry of human history.
          </p>
          <Link href="/stories/form">
          <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
          Share Your Story
          </button>
        </Link>
        </div>
      </section>
    </div>
  );
}