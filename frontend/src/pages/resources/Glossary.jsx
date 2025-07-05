import React from "react";

const glossaryItems = [
  { term: "Tempering (Tadka)", meaning: "Adding spices to hot oil to release aroma & flavor." },
  { term: "Simmer", meaning: "Cooking gently on low heat, usually with a small bubble action." },
  { term: "Fold", meaning: "A gentle mixing technique often used in baking." },
  { term: "Deglaze", meaning: "Adding liquid to a hot pan to lift stuck bits and create sauce." },
  { term: "Blanch", meaning: "Boiling briefly then placing in ice water to retain color & texture." },
  { term: "Roux", meaning: "A mix of flour and fat cooked together to thicken sauces." },
  { term: "Julienne", meaning: "Cutting vegetables into thin, stick-like strips." },
  { term: "Proof", meaning: "Letting dough rise to activate yeast." },
];

const Glossary = () => {
  return (
    <section className="bg-[#FFF8F2] min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-6 text-green-900">📚 Glossary</h1>
      <p className="mb-10 text-gray-700 text-lg">
        Cooking terms explained in simple words—so no more confusion when recipes get fancy!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {glossaryItems.map((item, index) => (
          <div
            key={index}
            className="rounded-xl shadow-md p-6 bg-white border-l-8 border-green-400 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">{item.term}</h2>
            <p className="text-gray-700">{item.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Glossary;
