import { fetchCountrysById } from "./countrysSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";


import { Link } from "react-router-dom";

export function CountryList() {
  const dispatch = useDispatch();

  const { entities, entitiesById } = useSelector((state) => state.countrys);
  const loading = useSelector((state) => state.loading);


  const [selectedOption, setSelectedOption] = useState("");

  const handleCountryById = (id) => {
    if (id) {
      setSelectedOption(id)
      dispatch(fetchCountrysById(id));
    }

  };

  return (
    <div className="container">
      <div className="row">
        <h1>Country Crud</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <select value={selectedOption} onChange={(e) => handleCountryById(e.target.value)} >
            <option
              key={0}
              value={0}
            >
              {"Select One"}
            </option>
            {entities.length &&
              entities.map(({ id, name }, i) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
          </select>
          {/* <button
            onClick={() => dispatch(fetchCountrys())}
            className="button-primary"
          >
            Load countrys
          </button> */}
        </div>
        <div className="two columns">
          <Link to="/add-country">
            <button className="button-primary">Add Country</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {entitiesById.length &&
                entitiesById.map(({ rank, name, flag, imagePath }, i) => (
                  <tr key={i ? i : ""}>
                    <td>{rank}</td>
                    <td>{name}</td>
                    <td>
                      <img src={imagePath + flag} alt={name} />
                      {/* <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-country/${rank}`}>
                        <button>Edit</button>
                      </Link> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
