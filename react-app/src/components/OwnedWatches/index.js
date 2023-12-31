import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import * as watchActions from '../../store/watch';

function YourWatches () {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    const watches = useSelector(state => state.watch.list)


    useEffect(() => {
        dispatch(watchActions.getAllWatches());
    }, [dispatch]);

    if (!watches || !watches['Watches']) {
        return <div>Loading...</div>;
      }

    const ownedWatches = watches && watches['Watches'].filter(
        watch => watch.owner_id === currentUser.id
    );



    return (
        <div className='watchMain__grid'>
        {ownedWatches.length > 0 ? (
            ownedWatches.map((watch) => (
            <div key={watch.id} className='watchMain__item'>
                <img src={watch.image_url} alt={`Image of ${watch.model_name}`} className='watchMain__image' />
                <p className="watchMain__name">{watch.model_name}</p>
                <p className="watchMain__brand">Brand: {watch.brand}</p>
                <p className="watchMain__price">Price $: {Number(watch.price).toLocaleString()}</p>
                <Link to={`/watch/${watch.id}`}>View More</Link>
            </div>
            ))
        ) : (
            <p className="no-watch-messages">Currently you have no watches listed for sale. Will you want to sell one?</p>
        )}
                  <footer className='footer'>
  <p>Developed by 
    <a  target="_blank" rel="noopener noreferrer"> Enea Jorgji</a> - React - Python - Flask - SQLAlchemy - PostgreSQL - Redux
  </p>
  <div class="social-links">
    <a href="https://github.com/ejorgji1" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-github"></i>
    </a>
    <a href="https://www.linkedin.com/in/enea-jorgji-563b60145/" target="_blank" rel="noopener noreferrer">
      <i class="fab fa-linkedin"></i>
    </a>
  </div>
</footer>
        </div>
        
    );
}

export default YourWatches