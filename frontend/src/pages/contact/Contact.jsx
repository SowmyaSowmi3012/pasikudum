import React from "react";
import catMascot from "../../assets/cat2.jpeg";

const Contact = () => {
  const handleRedirect = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdJ8FuEvDa0POe1H8nY6jzRokgmgEZf9MpNV-A0Ngbyr71tdg/viewform?usp=sharing&ouid=105240589732785345898",
      "_blank"
    );
  };

 return (
    <section className="min-h-screen bg-[#FFF8F2] px-6 py-12 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Cat Mascot */}
        <div className="lg:w-1/2 text-center">
          <img
            src={catMascot}
            alt="Chef Cat Mascot"
            className="w-72 mx-auto mb-6 rounded-xl shadow-lg"
          />
          <p className="text-pink-600 text-xl font-semibold">
            “Meow there! Need help? Let’s chat over chai!” ☕🐾
          </p>
        </div>

        {/* Right: Contact Text + Button */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-green-900 mb-6">
            📬 Get in Touch
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            💌 Whether it’s a recipe request, a shoutout, or just a friendly hello —
            I’d love to hear from you!
          </p>
          <p className="text-gray-700 mb-4 text-lg">
            🍜 Let’s talk about food, fun, and everything in between — your message will
            go straight to my inbox (and the cat might read it first 😹).
          </p>
          <p className="text-gray-700 mb-8 text-lg">
            🎉 Tap the button below and drop a message!
          </p>

          <button
            onClick={handleRedirect}
            className="bg-[#f8c18c] hover:bg-[#f1a95d] text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-300"
          >
            ✍️ Fill Out Contact Form
          </button>

          <p className="text-sm text-gray-500 mt-6">
            🐾 No spam. Just sprinkles of joy & food love!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;