import React, { useCallback, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField,
         saveService,
         fetchService,
       } from '../actions/actionCreators';


const selectServiceEdit = (state) => state.serviceEdit;

export function ServiceEdit() {
  const { item, loading, error } = useSelector(selectServiceEdit);
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();


  useEffect(() => {
      dispatch(fetchService(id));
  },
  [dispatch, id]);

  const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            dispatch(changeServiceField(name, value));
        },
        [dispatch]
  );

  const handleSubmit = useCallback(
         async (event) => {
            event.preventDefault();
            dispatch(saveService(item));
            history.replace("/services");
           },
        [item, dispatch, history]
  );

if (loading) {
      return (<div className="loader"></div>);
  };
  if (error) {
      return (<div className="error">Произошла ошибка!</div>);
  };

  return(
      <form onSubmit={handleSubmit} >
         <label htmlFor="name">Название</label>
         <input name="name"
                onChange={handleChange}
                value={item.name}
                disabled={item.loading}
         />
         <label htmlFor="price">Цена</label>
         <input name="price"
                onChange={handleChange}
                value={item.price}
                disabled={item.loading}
         />
         <label htmlFor="content">Описание</label>
         <input name="content"
                onChange={handleChange}
                value={item.content}
                disabled={item.loading}
         />
        <div className="buttons">
          <button type="submit" disabled={item.loading} className="button">
            {item.loading ?
            <div className="loader_button"></div>
             : "Сохранить"}
          </button>
          <Link to="/services" className="button">Отмена</Link>
        </div>
      </form>
  );
}
