import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            We are a leading platform for sharing news articles and updates. Stay informed with the latest news and trends.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm">
            <li className="mb-2">
              <a href="/home" className="hover:text-gray-300">Home</a>
            </li>
            <li className="mb-2">
              <a href="/articles" className="hover:text-gray-300">Articles</a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:text-gray-300">About Us</a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:text-gray-300">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-4">
            Email: <a href="mailto:info@example.com" className="hover:text-gray-300">info@example.com</a>
          </p>
          <p className="text-sm mb-4">Phone: +1 123 456 7890</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:text-gray-300">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="hover:text-gray-300">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="hover:text-gray-300">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 text-center py-4">
        <p className="text-sm">© 2024 Your Application Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
