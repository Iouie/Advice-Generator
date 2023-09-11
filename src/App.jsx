import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false); // check if api is loaded in
  const [advice, setAdvice] = useState({}); // state to store my api data

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // check if using mobile device

  const MobileSVG = () => {
    return (
      <div className="mb-2">
        <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
            <g transform="translate(138)" fill="#CEE3E9">
              <rect width="6" height="16" rx="3" />
              <rect x="14" width="6" height="16" rx="3" />
            </g>
          </g>
        </svg>
      </div>
    );
  };

  const DesktopSVG = () => {
    return (
      <div className="mb-2">
        <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
            <g transform="translate(212)" fill="#CEE3E9">
              <rect width="6" height="16" rx="3" />
              <rect x="14" width="6" height="16" rx="3" />
            </g>
          </g>
        </svg>
      </div>
    );
  };
  // create a function to call API for our button
  const callAPI = async () => {
    axios
      .get("https://api.adviceslip.com/advice") // get API data
      .then((response) => {
        setAdvice(response.data.slip); // setAdvice onto this state
        setLoading(false); // since data loaded, set it to false
        console.log(isMobile);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setLoading(true); // initially set loading to true when mounting

    callAPI();
  }, []);

  return (
    <main className="bg-[#202632] flex justify-center items-center min-h-screen text-[28px]">
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="flex flex-col rounded-lg bg-[#313a49]  pt-[40px] text-center font-manrope md:w-[480px] w-[90%]">
          <p className="text-[#52ffa8] tracking-widest pb-6 text-[18px]">
            ADVICE #{advice.id}
          </p>
          <p className="font-extrabold pb-6 px-10">
            &quot;{advice.advice}&quot;
          </p>
          {isMobile ? <MobileSVG /> : <DesktopSVG />}
          <button
            className="rounded-full relative top-6 bg-[#52ffa8] w-[55px] h-[55px] mx-auto md:hover:shadow-[0_20px_50px_rgba(123,_239,_178,_0.7)]"
            onClick={callAPI}
          >
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                fill="#202733"
              />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
