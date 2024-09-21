"use client"; // Mark this as a client-side component

import React from "react";
import Image from "next/image";

const WhatsAppWidget = () => {
  const phoneNumber = "221778744123"; // Replace with your WhatsApp number

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <Image
        src="/whatsapp.svg" // Add your WhatsApp icon here
        alt="WhatsApp"
        width={40}
        height={40}
      />
      <span className="whatsapp__message">Envoyer nous un Message sur </span>
    </a>
  );
};

export default WhatsAppWidget;
