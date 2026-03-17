import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //make an api call to gpt and get movies

    const gptQuery = `Suggest exactly 5 movie titles similar to: ${searchText.current.value}.
    Return ONLY a JSON array like this:
    ["Movie1","Movie2","Movie3","Movie4","Movie5"]
    No explanation.`;
    
   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "NetflixGPT",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/hunter-alpha",
        messages: [
          { role: "user", content: gptQuery }
        ]
      })
    });

    const data = await response.json();
   const gptMovies = JSON.parse(
      data.choices[0].message.content
    );

    console.log(gptMovies);
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    const filteredResults = tmdbResults.map((movies) =>
      movies.length ? [movies[0]] : []
    );
    console.log(filteredResults);
    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: filteredResults }));
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
