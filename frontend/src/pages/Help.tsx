import React from "react";
import { Helmet } from "react-helmet";
import LayoutWrapper from "../components/wrapper/LayoutWrapper";

const Help: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HelpPage",
    name: "Jannat Heights Help Center",
    description:
      "Get the assistance you need with Jannat Heights' Help Center. Browse FAQs, troubleshoot common issues, and contact our support team for expert help with your luxury apartment needs in Bahria Town Lahore.",
    url: "https://www.jannatheightsplaza.live/help",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      telephone: "+92-3001508712",
      email: "support@jannatheightsplaza.live",
      availableLanguage: "English",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I book an apartment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To book an apartment, visit our booking page, select your desired dates and apartment type, and complete the booking process.",
          },
        },
        {
          "@type": "Question",
          name: "What amenities are included?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our apartments include fully equipped kitchens, air-conditioned rooms, modern furnishings, and all necessary utilities for a comfortable stay.",
          },
        },
      ],
    },
  };

  return (
    <LayoutWrapper
      title="Help Center - Jannat Heights"
      description="Get the assistance you need with Jannat Heights' Help Center. Browse FAQs, troubleshoot common issues, and contact our support team for expert help with your luxury apartment needs in Bahria Town Lahore."
      keywords="Jannat Heights, Help Center, customer support, FAQs, troubleshooting, Bahria Town Lahore, luxury apartments assistance"
      author="Jannat Heights - Bahria Town Lahore"
      robots="index, follow"
    >
      <div className="bg-gray-100 min-h-screen">
        <Helmet>
          {/* Open Graph tags */}
          <meta property="og:title" content="Help Center - Jannat Heights" />
          <meta
            property="og:description"
            content="Get the assistance you need with Jannat Heights' Help Center. Browse FAQs, troubleshoot common issues, and contact our support team for expert help with your luxury apartment needs in Bahria Town Lahore."
          />
          <meta
            property="og:image"
            content="https://www.jannatheightsplaza.live/jh192.png"
          />
          <meta
            property="og:url"
            content="https://www.jannatheightsplaza.live/help"
          />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Help Center - Jannat Heights" />
          <meta
            name="twitter:description"
            content="Explore Jannat Heights' Help Center for answers to your questions, troubleshooting tips, and support options. We're dedicated to providing excellent service for our luxury apartments in Bahria Town Lahore."
          />
          <meta
            name="twitter:image"
            content="https://www.jannatheightsplaza.live/jh512.png"
          />
          <meta
            name="twitter:url"
            content="https://www.jannatheightsplaza.live/help"
          />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>

        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Help Center
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Get the assistance you need with Jannat Heights' Help Center. Browse
            FAQs, troubleshoot common issues, and contact our support team for
            expert help with your luxury apartment needs in Bahria Town Lahore.
          </p>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  How do I book an apartment?
                </h3>
                <p className="text-gray-600">
                  To book an apartment, visit our booking page, select your
                  desired dates and apartment type, and complete the booking
                  process.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  What amenities are included?
                </h3>
                <p className="text-gray-600">
                  Our apartments include fully equipped kitchens,
                  air-conditioned rooms, modern furnishings, and all necessary
                  utilities for a comfortable stay.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you need further assistance, feel free to reach out to our
              support team:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Phone: +92-3001508712</li>
              <li>Email: support@jannatheights.com</li>
              <li>Feel free to reach out 24 / 7</li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Help;
