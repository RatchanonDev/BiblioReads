import { useState } from "react";
import Link from "next/link";
import ResultData from "./ResultData";
import Loader from "./global-components/Loader";
import Footer from "./global-components/Footer";

const FormQuery = () => {
  const [inputValue, setInputValue] = useState("");
  const [scrapedData, setscrapedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isQuery, setIsQuery] = useState(true);

  {
    /* When the button is clicked/submitted send a fetch request to the scraper API*/
  }

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch("/api/scraper", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ queryURL: inputValue }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setscrapedData(userData);
        setIsLoading(false);
        setIsQuery(false);
      });
  };

  return (
    <div className={isQuery ? "bg-transparent" : "dark:bg-gradientedge"}>
      {/* Show the loader when the page is loading*/}
      {isLoading && <Loader />}
      <main
        className={
          isLoading ? "hidden" : "flex justify-center items-center align-middle"
        }
      >
        {/* Once query results are loaded, don't show the title text*/}
        <div
          className={
            isQuery
              ? "flex flex-col xl:flex-row justify-center items-center text-center h-[80vh] w-full"
              : "hidden"
          }
        >
          <div className={isQuery ? "mr-0 xl:mr-40" : "hidden"}>
            <h1 className="font-extrabold text-transparent text-6xl sm:text-8xl bg-clip-text bg-gradient-to-br from-pink-400 to-rose-600">
              <Link href="/">BiblioReads</Link>
            </h1>
            <h2 className="my-10 text-4xl text-transparent font-bold text-black dark:text-gray-200">
              Get Info About A GoodReads Book:
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center text-center">
              <label className="flex flex-col">
                <h3 className="text-2xl text-black dark:text-gray-200 font-semibold mb-10">
                  Enter A GoodReads Book URL: &nbsp;
                </h3>
                <input
                  className="rounded-md mx-10 py-3 px-5 text-left text-black text-sm bg-slate-200 border-4 border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  type="url"
                  required
                />
              </label>
              <div className="mx-10 my-6 font-semibold text-lg text-red-600">
                <p>{scrapedData.error}</p>
              </div>
              <button className="font-semibold text-md text-gray-900 dark:text-white bg-rose-500 ring ring-rose-600 ring-offset-2 ring-offset-rose-100 py-4 px-10 rounded-xl shadow-lg shadow-rose-500 hover:shadow-xl hover:bg-rose-600 transition duration-300 delay-40 hover:delay-40">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* If there is no query don't show the results component */}
        <section className={isQuery ? "hidden" : "flex mb-12"}>
          <ResultData scrapedData={scrapedData} />
        </section>
      </main>
      <div className={isLoading ? "hidden" : ""}>
        <Footer />
      </div>
    </div>
  );
};

export default FormQuery;
