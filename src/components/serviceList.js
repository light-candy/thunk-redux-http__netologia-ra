import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices,
        removeService
       } from '../actions/actionCreators';



export function ServiceList(){
    const { items, loading, error } = useSelector((state) => state.serviceList);
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchServices());
    }, [dispatch]);

    const handleRemove = (id) => {
      dispatch(removeService(id));
    };

    if (loading) {
        return (<div className="loader"></div>);
    };
    if (error) {
        return (<div className="error">Произошла ошибка!</div>);
    };
   
    return(
        <ul>
         {items.map((item) => (
             <li key={item.id}>
           {`${item.name} ${item.price}`}
           {item.loading ?
           <button className="button" disabled>
             <div className="loader_button"></div>
           </button> :
           <div>
             <Link to={`/services/${item.id}`} className="button button_list">
               <span className="material-icons">
                 create
               </span>
             </Link>
             <button onClick={() => handleRemove(item.id)} className="button button_list">
               <span className="material-icons">
                 close
               </span>
             </button>
           </div>}
         </li>
         ))}
        </ul>
    );
}
