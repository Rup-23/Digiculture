
// "use client";
// import Link from "next/link";

// export default function About() {
//   return (
//     <div className="min-h-screen bg-[#121212] text-gray-300 font-sans">
//       {/* Hero Section */}
//       <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-center relative">
//         <div className="absolute inset-0 bg-texture opacity-20"></div>
//         <div className="container mx-auto relative z-10">
//           <h1 className="text-6xl font-extrabold text-[#FFD700] mb-6 tracking-wide drop-shadow-lg">
//             Unheard Narratives
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
//             A digital museum preserving untold stories, celebrating unheard voices, and showcasing the richness of hidden histories.
//           </p>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-16 bg-gray-800 px-6">
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
//           {[ 
//             { title: "Our Story", text: "History is not just about grand events but also about everyday lives, cultures, and personal journeys. Our digital museum preserves these overlooked narratives, ensuring they live on for future generations." },
//             { title: "Join Us On This Journey", text: "Help us amplify unheard voices. Whether you have a story to share or wish to explore hidden histories, join our community and contribute to a more inclusive historical archive." }
//           ].map((section, index) => (
//             <div key={index} className="border-l-4 border-[#FFD700] pl-6">
//               <h2 className="text-4xl font-bold text-[#FFD700] mb-4">{section.title}</h2>
//               <p className="text-gray-400 leading-relaxed">{section.text}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Core Values Section */}
//       <section className="py-16 bg-gray-900 px-6">
//         <div className="container mx-auto">
//           <h2 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Our Core Values</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { title: "Authenticity", desc: "We present stories with integrity, ensuring they are accurately represented and preserved." },
//               { title: "Inclusivity", desc: "We celebrate diverse experiences, providing a platform for all voices, regardless of background." },
//               { title: "Preservation", desc: "We safeguard these invaluable stories, ensuring they remain part of our shared history." }
//             ].map((value, index) => (
//               <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-[#FFD700] transition-all hover:scale-105">
//                 <h3 className="text-2xl font-semibold text-[#FFD700] mb-4">{value.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{value.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-center">
//         <div className="container mx-auto">
//           <h2 className="text-5xl font-bold text-[#FFD700] mb-6">Share Your Story</h2>
//           <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
//             Contribute your untold narratives and help us expand the tapestry of human history.
//           </p>
//           <Link href="/stories/form">
//             <button className="bg-[#FFD700] text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
//               Share Your Story
//             </button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }




"use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-[#121212] text-gray-300 font-sans">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-center relative">
        <div className="absolute inset-0 bg-texture opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-6xl font-extrabold text-[#FFD700] mb-6 tracking-wide drop-shadow-lg">
            Unheard Narratives
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            A digital museum preserving untold stories, celebrating unheard voices, and showcasing the richness of hidden histories.
          </p>
        </div>
      </section>

      {/* Mission & Features */}
      <section className="py-16 bg-gray-800 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-l-4 border-[#FFD700] pl-6">
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              In a world where only the loudest voices are heard, countless stories remain buried—ignored by mainstream platforms and left untold. <strong>Unheard Narratives</strong> is our answer to this silence. We are building a digital museum that gives voice to those who have been overlooked, marginalized, or forgotten. Whether it’s folklore, real-life events, cultural rituals, or community memories—every story matters here.
            </p>
          </div>

          <div className="border-l-4 border-[#FFD700] pl-6">
            <h2 className="text-4xl font-bold text-[#FFD700] mb-4">What Makes Us Unique</h2>
            <p className="text-gray-400 leading-relaxed">
              Users can submit their own stories with <strong>text, images, video, and audio</strong>. We even use <strong>AI-powered summarization</strong> to give quick insights into the content. Every story goes through an <strong>approval system</strong> managed via an admin panel. With <strong>role-based login</strong> for both users and admins, we ensure a secure, organized, and collaborative space for cultural preservation.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-900 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", desc: "We present stories with integrity, ensuring they are accurately represented and preserved." },
              { title: "Inclusivity", desc: "We celebrate diverse experiences, providing a platform for all voices, regardless of background." },
              { title: "Preservation", desc: "We safeguard these invaluable stories, ensuring they remain part of our shared history." }
            ].map((value, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 hover:border-[#FFD700] transition-all hover:scale-105">
                <h3 className="text-2xl font-semibold text-[#FFD700] mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-800 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                step: "01",
                title: "Submit Your Story",
                desc: "Users can write and upload stories in various formats—text, images, audio, and video. It's simple and intuitive.",
              },
              {
                step: "02",
                title: "AI-Powered Summary",
                desc: "Once submitted, the story is automatically summarized using advanced AI to help readers quickly understand the core of each narrative.",
              },
              {
                step: "03",
                title: "Admin Review & Publish",
                desc: "Stories remain in pending mode until reviewed by an admin. After approval, they're published on the platform for the world to explore.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:border-[#FFD700] transition-all hover:scale-105 shadow-lg">
                <h3 className="text-5xl font-extrabold text-[#FFD700] mb-4">{item.step}</h3>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-12 bg-gray-900 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl italic text-gray-300 mb-4">
            “This platform is my way of giving a voice to those whose stories deserve to be told. Let’s preserve the richness of human experience together.”
          </p>
          <p className="text-[#FFD700] font-semibold text-lg">— Founder, Unheard Narratives</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-center">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-[#FFD700] mb-6">Share Your Story</h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
            Contribute your untold narratives and help us expand the tapestry of human history.
          </p>
          <Link href="/stories/form">
            <button className="bg-[#FFD700] text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              Share Your Story
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
