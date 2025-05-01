import { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [input, setInput] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [highestLowercase, setHighestLowercase] = useState("");

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest lowercase alphabet",
      label: "Highest lowercase alphabet",
    },
  ];

  const file_b64 = "";
  const handleClick = async () => {
    try {
      const data = JSON.parse(input);
      console.log("clicked");

      const res = await axios.post("http://localhost:7777/bfhl", {
        data,
        file_b64,
      });

      const resData = res?.data;

      setResponse(resData);
      setAlphabet(resData?.alphabets);
      setNumbers(resData?.numbers);
      setHighestLowercase(resData?.highest_lowercase_alphabet);
      setShowFilter(true);

      console.log(resData);
    } catch (err) {
      console.log(err);
      alert("Invalid JSON input. Please check and try again.");
    }
  };
console.log(highestLowercase);

  return (
    <>
      <div className="flex flex-col">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-[50%] mx-auto rounded-md border my-4 p-3"
          placeholder="API Input (e.g., [1, 'a', 'b', 2])"
        />
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white p-3 w-[50%] mx-auto rounded-md cursor-pointer"
        >
          Submit
        </button>
      </div>

      {showFilter && (
        <div>
          <Select
            isMulti
            className="w-[50%] mx-auto my-5"
            options={options}
            onChange={(options) => {
              setSelectedOptions(options.map((option) => option.value));
            }}
          />
          <p className="text-center font-bold">Filtered Response:</p>
          <div className="w-[50%] mx-auto my-4 space-y-2">
            {selectedOptions.includes("numbers") && numbers && numbers.length > 0 && (
              <p>Numbers: {numbers.join(", ")}</p>
            )}

            {selectedOptions.includes("alphabets") && alphabet && alphabet.length > 0 && (
              <p>Alphabets: {alphabet.join(", ")}</p>
            )}

            {selectedOptions.includes("highest lowercase alphabet") && (
              <p>
                Highest Lowercase Alphabet:{" "}
                {highestLowercase ? highestLowercase : "No data available"}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
