import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function AdviceTitle() {
  return (
    <div className="advice-title">
      <img src="/mind.png" alt="Advice Icon" className="advice-icon" />
      <h1>Mindful Life Hacks </h1>
      <h5>Get a piece of advice to make your day better!</h5>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <p>Loading Please wait...</p>
    </div>
  );
}

function AdviceApp() {
  const [advice, setAdvice] = useState(
    "Some people would be better off if they took their own advice.",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchAdvice() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const advice = await response.json();
      setAdvice(advice.slip.advice);
    } catch (error) {
      setError("Something went wrong! Try again later!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="advice-container">
        <AdviceTitle />
        <div className="advice-feedback">
          <span>A quick one: </span>
          <div className="content">
            {advice && <p className="advice">{advice}</p>}
            {error && <p className="error">{error}</p>}
          </div>
          <button
            className="button"
            title="Get New Advice"
            onClick={fetchAdvice}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              "Get New Advice"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default AdviceApp;
