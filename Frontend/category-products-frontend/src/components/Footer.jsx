// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 text-sm text-center py-1 mt-1">
      <p>
        © {new Date().getFullYear()} RSRO-Banking. All rights reserved. For
        help, contact support@rsrobanking.com
      </p>
    </footer>
  );
};

export default Footer;
