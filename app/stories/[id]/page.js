
import dbConnect from "@/lib/dbConnect";
import Story from "@/models/storyModel";
import Link from "next/link";
import SummarizeButtonWrapper from "@/components/SummarizeButtonWrapper";

export default async function StoryPage({ params }) {
  await dbConnect();
  const { id } = await params;

  if (!id) {
    return <p className="text-center text-gray-400 text-xl font-semibold">Invalid Story ID</p>;
  }

  let story;
  try {
    story = await Story.findById(id);
    if (!story) {
      return <p className="text-center text-gray-400 text-xl font-semibold">Story not found</p>;
    }
  } catch (error) {
    console.error("Error fetching story:", error);
    return <p className="text-center text-red-500 text-xl font-semibold">Error loading story</p>;
  }

  const storyText = story.content
    .filter((item) => item.type === "text")
    .map((item) => item.value)
    .join(" ");

  return (
    <div className="w-full min-h-screen bg-[#080808] text-gray-100">
      
      <main className="pt-20">
        {/* Exhibition Hero */}
        <div className="relative h-56 md:h-64 lg:h-72 w-full bg-gradient-to-b from-black via-transparent to-[#080808] flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-bottom bg-cover" style={{ backgroundImage: `url('/bg-texture.jpg')` }}></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
              {story.title}
            </h1>
            <p className="inline-block px-3 py-1 bg-[#FFD700]/10 text-[#FFD700] rounded-full text-xs font-medium tracking-wide mb-4 uppercase">
              {story.storyType || "Historical Exhibit"}
            </p>
          </div>
        </div>
        
        {/* Exhibition Trail */}
        <div className="bg-black/30 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-3 flex text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-300">Museum</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{story.title}</span>
          </div>
        </div>
        
        {/* Curator's Note */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg p-6 shadow-lg border border-white/5">
            <div className="flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#1D1D1D] border border-white/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-serif text-white mb-3">Curator's Note</h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  This exhibit is a curated story reflecting a unique piece of cultural or historical relevance. The narrative and visuals have been carefully preserved and presented to offer insight into this important historical moment. Take your time exploring each element.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exhibition Content */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {story.content.map((item, index) => (
                <div key={index} className="scroll-m-24" id={`artifact-${index}`}>
                  {item.type === "text" && (
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5">
                      <div className="p-6 md:p-8">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">Written Account</p>
                        <div className="mt-2 font-serif text-gray-200 leading-relaxed text-lg">
                          <p>"{item.value}"</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="text-xs text-gray-500">Reference #MUS-{Math.floor(Math.random() * 9000) + 1000}</div>
                          <div className="flex items-center gap-3">
                            <button className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                            </button>
                            <button className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {item.type === "image" && (
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5">
                      <div className="relative p-1">
                        <img
                          src={item.value}
                          alt="Exhibit"
                          className="rounded-md w-full object-cover"
                        />
                        <div className="absolute top-3 left-3 py-1 px-3 bg-black/70 backdrop-blur-sm rounded-full">
                          <p className="text-xs uppercase tracking-wider text-gray-300">
                            Visual Documentation
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400 italic">Historical photograph</p>
                          <div className="text-xs text-gray-500">Catalog #PHO-{Math.floor(Math.random() * 9000) + 1000}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {item.type === "video" && (
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5">
                      <div className="relative p-1">
                        <video controls className="rounded-md w-full">
                          <source src={item.value} />
                        </video>
                        <div className="absolute top-3 left-3 py-1 px-3 bg-black/70 backdrop-blur-sm rounded-full">
                          <p className="text-xs uppercase tracking-wider text-gray-300">
                            Video Testimony
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-black/40">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400 italic">Original footage • Restored {new Date().getFullYear()}</p>
                          <div className="text-xs text-gray-500">Archive #VID-{Math.floor(Math.random() * 9000) + 1000}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {item.type === "audio" && (
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5">
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">Audio Recording</p>
                        <div className="mt-4">
                          <div className="my-4 flex justify-center">
                            <div className="w-16 h-16 rounded-full bg-black/30 border border-white/10 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                              </svg>
                            </div>
                          </div>
                          <audio
                            controls
                            className="w-full mt-4"
                            style={{
                              backgroundColor: "#111",
                              borderRadius: "8px",
                              padding: "12px",
                            }}
                          >
                            <source src={item.value} />
                          </audio>

                          <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-400 italic">Oral history • Digitally preserved</p>
                            <div className="text-xs text-gray-500">Record #AUD-{Math.floor(Math.random() * 9000) + 1000}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Side Panel */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                {/* Exhibit Information */}
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5 mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-white mb-4">About This Exhibit</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{story.storyType || "Historical Account"}</span>
                      </div>
                      {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Date Added:</span>
                        <span className="text-white">{new Date().toLocaleDateString()}</span>
                      </div> */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Collection:</span>
                        <span className="text-white">Untold Stories</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Artifacts:</span>
                        <span className="text-white">{story.content.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Curation:</span>
                        <span className="text-white">Digital Archives Team</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5 mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-white mb-4">Explore Artifacts</h3>
                    <ul className="space-y-2">
                      {story.content.map((item, index) => (
                        <li key={index}>
                          <a 
                            href={`#artifact-${index}`} 
                            className="flex items-center py-2 px-3 rounded-md hover:bg-white/5 transition-colors text-sm group"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center mr-3 group-hover:bg-[#FFD700] transition-colors">
                              <span className="text-xs text-gray-400 group-hover:text-black transition-colors">{index + 1}</span>
                            </div>
                            <span className="text-gray-400 group-hover:text-white transition-colors">
                              {item.type === "text" && "Written Account"}
                              {item.type === "image" && "Visual Documentation"}
                              {item.type === "video" && "Video Testimony"}
                              {item.type === "audio" && "Audio Recording"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Analysis Tool */}
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-lg overflow-hidden shadow-lg border border-white/5">
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-white mb-4">Analyze This Exhibit</h3>
                    <p className="text-sm text-gray-400 mb-6">
                      Our AI analysis tool can provide deeper insights into the historical context and significance of this exhibit.
                    </p>
                    <SummarizeButtonWrapper storyText={storyText} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contribute Call to Action */}
        <div className="bg-gradient-to-b from-[#080808] to-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif text-white mb-4">Contribute to the Archive</h2>
              <p className="text-lg text-gray-400 mb-8">
                Every story matters. Help us preserve human experiences by submitting your own cultural, historical, or personal narrative.
              </p>
              <Link href="/stories/form">
                <button className="bg-[#FFD700] text-black font-bold py-3 px-8 rounded-md hover:bg-[#E5C100] transition-all">
                  Share Your Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}