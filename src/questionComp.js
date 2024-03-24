import { useEffect, useState } from "react";
import React from "react";

function QuestionComp() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [screen, setScreen] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (page == 0) document.getElementById("prevBtn").style.display = "none";
    else document.getElementById("prevBtn").style.display = "block";
    if (page == Question.length - 1)
      document.getElementById("nextBtn").style.display = "none";
    else document.getElementById("nextBtn").style.display = "block";
  }, [page]);

  useEffect(() => {
    if (selected.length == Question.length)
      document.getElementById("submitBtn").style.backgroundColor = "rgb(37 99 235)";
    else document.getElementById("submitBtn").style.backgroundColor = "rgb(179, 176, 176)";
  }, [selected]);

  useEffect(() => {
    if (screen) {
      let newScore = 0;
      correctAns.forEach((correct) => {
        const selectedOption = selected.find(
          (item) => item.page === correct.page
        );
        if (selectedOption && selectedOption.option === correct.option)
          newScore += 2;
      });
      setScore(newScore);
    }
  }, [screen, selected]);

  const Question = [
    {
      ques: "Which of the following is true regarding Babel ?",
      opt: ["Compiler", "Transpilar", "Both", "None"],
    },
    {
      ques: "Which of the following is a way to handle data in React.js ?",
      opt: ["Services and Components", "State and Props", "State and Services", "State and Component"],
    },
    {
      ques: "What is the default port number in which the application run ?",
      opt: ["3000", "8080", "5000", "3030"],
    },
    {
      ques: "In React.js which one of the following is used to create a class for Inheritance?",
      opt: ["Create", "Extends", "Inherits", "Delete"],
    },
    {
      ques: "Which of the following command is used to create react-js-app ?",
      opt: ["npx create-react-app appname", "npm install create-react-app", "npx install create-react-app -g","install - l create-react-app"],
    },
  ];

  const correctAns = [
    {
      page: 0,
      option: "Both",
    },
    {
      page: 1,
      option: "State and Props",
    },
    {
      page: 2,
      option: "3000",
    },
    {
      page: 3,
      option: "Extends",
    },
    {
      page: 4,
      option: "npx create-react-app appname",
    },
  ];

  console.log(Question.length);

  function prevHandler() {
    if (page > 0) setPage(page - 1);
  }
  function nextHandler() {
    if (page < Question.length - 1) setPage(page + 1);
  }
  function submitHandler() {
    setScreen(true);
  }
  function selectHandler(opti) {
    const existingIndex = selected.findIndex((item) => item.page == page);
    if (existingIndex !== -1) {
      const updatedSelected = [...selected];
      updatedSelected[existingIndex].option = opti;
      setSelected(updatedSelected);
    } else {
      const selectedOption = {
        page: page,
        option: opti,
      };
      setSelected((prevSelected) => [...prevSelected, selectedOption]);
    }
  }
  console.log(selected);

  return (
    <>
      {screen ? (
        <div className="text-white flex flex-col justify-center items-center">
          <p className="text-2xl">Your Score is :</p>
          <p className="text-4xl font-bold">{score} / {Question.length*2}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md shadow-gray-700 w-[80vw] sm:w-[500px]">
            <p className="text-lg sm:text-xl font-medium">{Question[page].ques}</p>
            <div>
              {Question[page].opt.map((opti, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <input
                    type="radio"
                    id={opti}
                    name="options"
                    onClick={() => selectHandler(opti)}
                    checked={
                      selected.find((item) => item.page === page)?.option ===
                      opti
                    }
                  ></input>
                  <label htmlFor={opti} className="text-base sm:text-lg">
                    {opti}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center gap-4">
              <button
                id="prevBtn"
                className="bg-blue-600 px-4 py-1 rounded-lg text-white shadow-md shadow-gray-700"
                onClick={prevHandler}
              >
                &larr;Prev
              </button>
              <button
                id="nextBtn"
                className="bg-blue-600 px-4 py-1 rounded-lg text-white shadow-md shadow-gray-700"
                onClick={nextHandler}
              >
                Next&rarr;
              </button>
            </div>
            <button
              id="submitBtn"
              className="px-4 py-1 rounded-lg text-white shadow-md shadow-gray-700"
              onClick={submitHandler}
              disabled={selected.length==Question.length?false:true}
            >
              Submit Test
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default QuestionComp;
