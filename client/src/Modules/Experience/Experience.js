import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import * as Experience_Hook from "./Experience_Hook";
import * as Experience_BusinessLogic from "./Experience_BusinessLogic";
import { useAuth } from "../../Hooks/AuthHook";

const Experience = () => {
  //check if user is authorized or not.
  //useAuth();
  const [state, dispatch] = useReducer(
    Experience_Hook.experienceReducer,
    Experience_Hook.initialState
  );

  //Redux dispatch to update the loader state or any other redux related states
  const reduxDispatch = useDispatch();

  const objContext = {
    state,
    dispatch,
    reduxDispatch,
    Experience_BusinessLogic:
      new Experience_BusinessLogic.Experience_BusinessLogic(),
  };

  // Initialize the fetch using the custom hook
  Experience_Hook.useFetchExperiences(objContext);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center">
      {state.isDataLoaded ? (
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8">
          <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
            Work Experience
          </h1>
          <ul className="space-y-6">
            {state.experiences.map((experience, index) => (
              <li
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <div className="text-2xl font-semibold text-blue-600 mb-2">
                  {experience.jobTitle}
                </div>
                <div className="text-lg text-gray-700 mb-2">
                  <span className="font-bold">Company:</span>{" "}
                  {experience.company}
                </div>
                <div className="text-gray-700 text-base mb-4">
                  <div className="font-bold mb-1">Responsibilities:</div>
                  <div style={{ whiteSpace: "pre-line" }}>
                    {experience.responsibilities}
                  </div>
                </div>
                <div className="text-gray-600 text-sm">
                  <span className="font-bold">From:</span> {experience.fromDate}{" "}
                  <span className="font-bold">To:</span> {experience.toDate}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-xl font-semibold text-white animate-pulse">
          Loading data, please wait...
        </div>
      )}
    </div>
  );
};

export default Experience;
