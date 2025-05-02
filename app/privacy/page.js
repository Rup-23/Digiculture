import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Digital Museum',
  description: 'How we collect, use, and protect your data at Digital Museum.',
};

const page = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] py-28 px-6 md:px-12 lg:px-24 text-gray-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-10 border-b border-gray-700 pb-4">
          Privacy Policy
        </h1>

        <p className="mb-8 leading-relaxed text-lg">
          At <strong className="text-white font-semibold">DGCULTURE</strong>, we are deeply committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, utilize, and safeguard your data when you interact with our platform. We encourage you to read this policy carefully to understand our practices.
        </p>

        <Section title="1. Information We Collect">
          <li>
            <span className="font-semibold text-yellow-400">Account Information:</span> When you interact with our platform, we may collect your name, email address, and any other information you voluntarily provide within your submissions.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Multimedia Content:</span> This includes any images, audio recordings, and video files you upload as part of your stories.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Technical Data:</span> We automatically collect certain technical information, such as your IP address, browser type, device information, and interaction logs, to help us understand how you use our platform and improve its functionality.
          </li>
        </Section>

        <Section title="2. How We Use Your Data">
          <li>
            <span className="font-semibold text-yellow-400">Content Display:</span> To showcase and curate the valuable stories and multimedia content contributed by our users, making them accessible to a wider audience.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">AI-Powered Summaries:</span> We may utilize Gemini AI to generate concise summaries of user-submitted content, enhancing discoverability and providing quick insights.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Platform Enhancement:</span> To analyze user behavior and feedback, allowing us to continuously improve our platform's features, user experience, and overall performance.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Moderation and Security:</span> To monitor content, ensure compliance with our terms of service, and maintain a safe and respectful environment for all users.
          </li>
        </Section>

        <Section title="3. How We Protect Your Data" isParagraph>
          We employ robust and industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. These measures include:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><span className="font-semibold text-yellow-400">Encrypted API Communication:</span> Ensuring secure data transmission between your device and our servers.</li>
            <li><span className="font-semibold text-yellow-400">Secure Cloud Storage:</span> Utilizing trusted and secure cloud storage solutions like Cloudinary to safeguard your multimedia content.</li>
            <li><span className="font-semibold text-yellow-400">Strict Access Controls:</span> Limiting administrative access to sensitive data to authorized personnel only.</li>
            <li><span className="font-semibold text-yellow-400">Regular Security Audits:</span> Conducting periodic reviews and updates to our security protocols to address emerging threats.</li>
          </ul>
        </Section>

        <Section title="4. Content Ownership" isParagraph>
          We firmly believe that you retain full ownership of the stories and multimedia content you submit to the Digital Museum. By uploading your content, you grant us a non-exclusive, worldwide, royalty-free license to publish, display, and moderate your content for the purposes of operating and promoting the Digital Museum for cultural and educational endeavors.
        </Section>

        <Section title="5. Sharing With Third Parties" isParagraph>
          Your personal data is treated with the utmost confidentiality. We do not sell, trade, or rent your personal information to third parties for marketing purposes. In limited circumstances, we may process data through trusted AI services (such as Gemini) solely for the purpose of content summarization, and any such processing is subject to strict confidentiality agreements.
        </Section>

        <Section title="6. Your Rights">
          <li>
            <span className="font-semibold text-yellow-400">Content Deletion:</span> You have the right to request the deletion of your submitted stories and associated data at any time. Please contact us using the information provided below to initiate this process.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Data Correction:</span> You have the right to request updates or corrections to any inaccuracies in your personal data.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Access to Information:</span> You may have the right to request access to the personal information we hold about you.
          </li>
        </Section>

        <Section title="7. Changes to This Policy" isParagraph>
          We may periodically update this Privacy Policy to reflect changes in our practices or legal requirements. Any revisions will be posted on this page, and we encourage you to review it regularly. For significant changes, we will make a more prominent announcement on our website.
        </Section>

        <Section title="8. Contact Us" isParagraph>
          If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your data, please do not hesitate to contact us at:{' '}
          <a
            href="contact@digitalmuseum.com"
            className="text-blue-500 underline hover:text-blue-400 transition font-semibold inline-block mt-2"
          >
            contact@digitalmuseum.com
          </a>
        </Section>
      </div>
    </div>
  );
};

export default page;

// Reusable section component for improved structure and styling
function Section({ title, children, isParagraph }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">{title}</h2>
      {isParagraph ? (
        <div className="leading-relaxed text-gray-400">{children}</div>
      ) : (
        <ul className="list-disc pl-6 space-y-3 text-gray-400">{children}</ul>
      )}
    </div>
  );
}