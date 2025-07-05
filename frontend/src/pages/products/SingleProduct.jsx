import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const SingleProduct = () => {
  const item = useLoaderData();

  /* ─── scroll to top on mount ─────────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ─── helpers ─────────────────────────────────────────── */
  const extractNumber = (timeString = "") => {
    const n = parseInt(timeString.split(" ")[0], 10);
    return isNaN(n) ? 0 : n;            // NaN‑safe
  };

  const prepTime = extractNumber(item?.more?.[0]?.prep_time);
  const cookTime = extractNumber(item?.more?.[0]?.cook_time);
  const totalTime = prepTime + cookTime;

  /* 🔑 split instructions no matter the format */
  const instructionsArray = item?.instructions
    ? item.instructions
       .replace(/\r\n/g, '\n')           // Normalize line breaks
      .replace(/\n+/g, '\n')            // Collapse multiple newlines
      .split(/(?:Step\s*\d+\s*:|\d+\.\s+|\n{2,})/gi) // Split on "Step X:", "X." or paragraph breaks
        .map(t => t.trim())
        .filter(Boolean)                         // remove blanks
    : [];

  /* ─── ui ──────────────────────────────────────────────── */
  return (
    <section className="min-h-dvh md:flex justify-center items-center md:bg-eggshell">
 <article className="w-full md:max-w-4xl md:mx-auto">
        <div className="bg-white md:my-[5rem] md:py-8 pb-8 md:rounded-xl">
          {/* ── image ── */}
          <picture>
            <img
              src={item.thumbnail_image}
              alt={item.name}
              className="md:max-w-[90%] w-full md:h-[570px] md:rounded-xl md:mx-auto object-cover"
            />
          </picture>

          <div className="px-8">
            {/* title */}
            <h1 className="text-4xl mt-12 text-secondary">{item.name}</h1>

            {/* times */}
            <article className="bg-rose-50 mt-6 p-5 rounded-xl">
              <h3 className="text-xl font-semibold ml-2">Preparation Time</h3>
              <ul className="list-disc mt-3 ml-8 text-lg marker:text-orange-500">
                <li>Total : {totalTime || "N/A"} minutes</li>
                <li className="mt-3">
                  Preparation : {item?.more?.[0]?.prep_time || "N/A"}
                </li>
                <li className="mt-3">
                  Cooking : {item?.more?.[0]?.cook_time || "N/A"}
                </li>
              </ul>
            </article>

            {/* ingredients */}
            <div className="mt-5">
              <h3 className="text-xl font-semibold ml-2">Ingredients</h3>
              <ul className="list-disc marker:text-blue-500 mt-4 ml-6 text-secondary">
                {item?.ingredients?.map((ing, i) => (
                  <li key={i} className="pl-4 mt-2">
                    {ing.name} : {ing.quantity}
                  </li>
                ))}
              </ul>
            </div>

            {/* instructions */}
            <div className="mt-5">
              <h3 className="font-fancy text-3xl text-nutmeg">Instructions</h3>
              <ol className="list-decimal marker:text-nutmeg marker:font-semibold mt-4 ml-6">
                {instructionsArray.length
                  ? instructionsArray.map((line, i) => (
                      <li key={i} className="pl-4 mt-2">
                        {line}
                      </li>
                    ))
                  : <li className="pl-4 mt-2">No instructions provided.</li>}
              </ol>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SingleProduct;
