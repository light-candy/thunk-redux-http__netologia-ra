import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices,
        removeService
       } from '../actions/actionCreators';



export function ServiceList(){
    const { items, loading, error } = useSelector((state) => state.serviceList);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
      dispatch(removeService(id));
    };

    useEffect(() => {
       dispatch(fetchServices());
    }, [dispatch]);

    if (loading) {
        return (<div className="loader"></div>);
    };
    if (error) {
        return (<div className="error">Произошла ошибка!</div>);
    };
   
    return(
        <ul>
         {items.map(({ id, name, price }) => (
         <li key={id}>
           {`${name} ${price}`}
           <div>
             <Link to={`/services/${id}`} className="button button_list">
               <span className="material-icons">
                 create
               </span>
             </Link>
             <button onClick={() => handleRemove(id)} className="button button_list">
               <span className="material-icons">
                 close
               </span>
             </button>
           </div>
         </li>
         ))}
        </ul>
    );
}
