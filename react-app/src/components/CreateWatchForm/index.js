import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as watchActions from "../../store/watch";
import "./Watch.css";

function AddWatch() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [brand, setBrand] = useState("");
  const [model_name, setModelName] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [description, setDecription] = useState("");
  const [image_url, setImageUrl] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  const currentUser = useSelector((state) => state.session.user);
  const owner_id = currentUser ? currentUser.id : null;

  const urlValidation = (str) => {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/.test(str);
  };

  const validate = () => {
    const errors = [];

    if (!brand || brand.length < 5 || brand.length > 40) {
      errors.push("Brand name must be between 5 and 50 characters.");
    }

    if (!model_name || model_name.length < 5 || model_name.length > 50) {
      errors.push("Watch model name must be between 5 and 50 characters.");
    }

    if (!price) {
      errors.push("Watch price is required.");
    }

    if (!about || about.length > 500) {
      errors.push("Invalid about text.");
    }

    if (!description || description.length > 500) {
      errors.push("Invalid description text.");
    }

    if (!image_url) {
      errors.push = "Preview image is required.";
    }

    if (image_url && !image_url.match(/(\.png|\.jpg|\.jpeg)\s*$/)) {
      errors.push = "iImage URL must end in .png, .jpg, or .jpeg.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (errors.length > 0) return setValidationErrors(errors);

    const watchData = {
    brand,
    model_name,
    price,
    about,
    description,
    image_url,
    owner_id
    };
     console.log("This is Watch Data:", watchData)
    await dispatch(watchActions.createNewWatch(watchData));

    history.push(`/watch/all`);
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(watchActions.getAllWatches());
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="form__container watch__form">
      <div className="watch-error__container">
        {validationErrors.map((error, index) => (
          <div className="error" key={index}>
            {error}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input__container">
          <h2>New Watch</h2>
          <div className="form__input">
            <label>Brand</label>
            <p>
              This is the brand name of your watch.
            </p>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              placeholder="Enter the watch brand"
            />
          </div>
          <div className="form__input">
            <label>Model Name</label>
            <p>This is your watch model name.</p>
            <input
              type="text"
              value={model_name}
              onChange={(e) => setModelName(e.target.value)}
              required
              placeholder="Enter the model name of your watch"
            />
          </div>
          <div className="form__input">
            <label>Price</label>
            <p>Price you want to sell your watch. </p>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price"
            />
          </div>
          <div className="form__input">
            <label>About</label>
            <p>Provide some information about the watch you are selling.</p>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
              placeholder="Enter the information relevant to your watch"
            />
          </div>
          <div className="form__input">
            <label>Description</label>
            <p>Provide a brief description of your watch.</p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDecription(e.target.value)}
              required
              placeholder="Please describe your watch."
            />
          </div>
          <div className="form__input">
            <label>Image URL</label>
            <p>
            Liven up your watch with photo
            </p>
            <input
              type="text"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              placeholder="Submit a link to at least one photo to publish your spot."
            />
          </div>
        </div>
        <div className="form__input button__container">
          <button className="form__button" type="submit">
            Add Watch
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWatch;
