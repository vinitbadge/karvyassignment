import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { fetchCountrys } from "./countrysSlice";


export function AddCountry() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleName = (e) => setName(e.target.value);
  const handleRank = (e) => setRank(e.target.value);

  const { entitiesContinent } = useSelector((state) => state.countrys);


  const handleClick = () => {
    // if (name && rank) {
    const data = new FormData();

    data.append("name", name)
    data.append("continent", continent)
    data.append("rank", rank)
    data.append('file', file);
    fetch('http://localhost:8080/api/country', { method: 'POST', body: data }).then(response => response.json())
      .then(result => {
        //console.log('Success:', result.error);
        if (result.error && result.error.length) {
          console.log(result.error[0])
          setFormErrors(result.error[0])
        } else {
          setError(null);
          setFormErrors({})
          setName("");
          setRank("");
          dispatch(fetchCountrys())
          history.push("/");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const [continent, setContinent] = useState("");

  const [file, setFile] = useState("");

  const onDrop = picture => {
    setFile(picture[0]);
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add Country</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            name="name"
            type="text"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          {formErrors.name && (
            <p className="error" style={{ color: "red" }}> {formErrors.name} </p>
          )}
          <label htmlFor="continentInput">Continent</label>
          <select name="continent" value={continent} onChange={(e) => setContinent(e.target.value)} >
            <option
              key={0}
              value={0}
            >
              {"Select One"}
            </option>
            {entitiesContinent.length &&
              entitiesContinent.map((x, i) => (
                <option
                  key={i}
                  value={x}
                >
                  {x}
                </option>
              ))}
          </select>
          {formErrors.continent && (
            <p className="error" style={{ color: "red" }}> {formErrors.continent} </p>
          )}

          <label htmlFor="rankInput">Rank</label>
          <input
            name="rank"
            className="u-full-width"
            type="rank"
            id="emailInput"
            onChange={handleRank}
            value={rank}
          />
          {formErrors.rank && (
            <p className="error" style={{ color: "red" }}> {formErrors.rank} </p>
          )}
          <ImageUploader
            withIcon={true}
            onChange={onDrop}
          //  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          // maxFileSize={5242880}
          />
          {formErrors.file && (
            <p className="error" style={{ color: "red" }}> {formErrors.file} </p>
          )}
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
