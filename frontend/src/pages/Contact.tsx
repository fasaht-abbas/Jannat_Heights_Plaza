import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LayoutWrapper from "../components/wrapper/LayoutWrapper";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HeadingText } from "../components/reuseables/CustomTypographies";
import { api, handleError } from "../utils/axios";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

interface IFormInputs {
  name: string;
  email: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactUs: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const response = await api.post("/api/v1/user/send-contact-mail", {
        name: data.name,
        sender: data.email,
        message: data.message,
      });
      toast.success(response.data.message);
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      handleError(error);
    }
  };

  // structured data for the seo
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Jannat Heights",
    description:
      "Get in touch with Jannat Heights for inquiries, bookings, or support. We provide contact information and support options for our luxury apartments in Bahria Town Lahore.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+923001508712",
      email: "info@jannatheightsplaza.live",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Commercial # 13 , Shershah Block",
      addressLocality: "Bahria Town",
      addressRegion: "Lahore",
      postalCode: "53720",
      addressCountry: "PK",
    },
  };

  return (
    <LayoutWrapper
      title="Contact Us - Jannat Heights"
      description="Get in touch with Jannat Heights for inquiries, bookings, or support. We provide contact information and support options for our luxury apartments in Bahria Town Lahore."
      keywords="Contact Jannat Heights, contact information, luxury apartments Bahria Town, customer service, support, inquiries, Jannat Heights contact"
      author="Jannat Heights - Bahria Town Lahore"
      robots="index, follow"
    >
      <Helmet>
        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:title" content="Contact Us - Jannat Heights" />
        <meta
          property="og:description"
          content="Get in touch with Jannat Heights for inquiries, bookings, or support. We provide contact information and support options for our luxury apartments in Bahria Town Lahore."
        />
        <meta
          property="og:image"
          content="https://www.jannatheightsplaza.live/jh192.png"
        />
        <meta
          property="og:url"
          content="https://www.jannatheightsplaza.live/contact"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Jannat Heights" />
        <meta
          name="twitter:description"
          content="Get in touch with Jannat Heights for inquiries, bookings, or support. We provide contact information and support options for our luxury apartments in Bahria Town Lahore."
        />
        <meta
          name="twitter:image"
          content="https://www.jannatheightsplaza.live/jh512.png"
        />
        <meta
          name="twitter:url"
          content="https://www.jannatheightsplaza.live/contact"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <HeadingText className="w-full text-center" text="Contact Us" />
          <p className="mb-6 text-gray-600 text-center">
            Feel free to reach out to us through the form below or connect with
            us on social media.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                {...register("name")}
                className={`w-full px-3 py-2 border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                {...register("email")}
                className={`w-full px-3 py-2 border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                type="email"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                {...register("message")}
                className={`w-full px-3 py-2 border rounded ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-primary py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Connect with us on social media:
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-800 transition duration-200"
              >
                <FaFacebook className="text-primary" />
              </a>
              <a
                href="https://www.instagram.com/jannat_heights_rental?igsh=bmw4djM2bWFsZXg3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition duration-200"
              >
                <FaInstagram className="text-primary" />
              </a>

              <a
                href="https://web.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 transition duration-200"
              >
                <FaWhatsapp className="text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default ContactUs;
