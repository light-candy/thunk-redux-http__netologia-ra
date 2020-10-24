import {
    CHANGE_SERVICE_FIELD,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_FAILURE,
    SAVE_SERVICE_REQUEST,
    SAVE_SERVICE_SUCCESS,
    SAVE_SERVICE_FAILURE,
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICE_SUCCESS,
    FETCH_SERVICE_FAILURE,
    REMOVE_SERVICE_REQUEST,
    REMOVE_SERVICE_SUCCESS,
    REMOVE_SERVICE_FAILURE
} from './actionTypes';

export function changeServiceField(name, value) {
    return { type: CHANGE_SERVICE_FIELD, payload: { name, value } };
}

export function fetchServicesRequest() {
    return { type: FETCH_SERVICES_REQUEST };
}
export function fetchServicesSuccess(items) {
    return { type: FETCH_SERVICES_SUCCESS, payload: { items } };
}
export function fetchServicesFailure(error) {
    return { type: FETCH_SERVICES_FAILURE, payload: { error } };
}

export function saveServiceRequest() {
    return { type: SAVE_SERVICE_REQUEST };
}
export function saveServiceSuccess() {
    return { type: SAVE_SERVICE_SUCCESS };
}
export function saveServiceFailure(error) {
    return { type: SAVE_SERVICE_FAILURE, payload: { error } };
}

export function fetchServiceRequest() {
    return { type: FETCH_SERVICE_REQUEST };
}
export function fetchServiceSuccess(item) {
    return { type: FETCH_SERVICE_SUCCESS, payload: { item } };
}
export function fetchServiceFailure(error) {
    return { type: FETCH_SERVICE_FAILURE, payload: { error } };
}
export function removeServiceRequest(id) {
  return { type: REMOVE_SERVICE_REQUEST, payload: { id} };
}
export function removeServiceSuccess(id) {
  return { type: REMOVE_SERVICE_SUCCESS, payload: { id } };
}
export function removeServiceFailure(error, id) {
    return { type: REMOVE_SERVICE_FAILURE, payload: { error, id } };
}


export const fetchServices = () => async(dispatch) => {
  dispatch(fetchServicesRequest());
    try {
      const response = await fetch('http://localhost:7070/api/services');
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      const services = await response.json();
      dispatch(fetchServicesSuccess(services));
    } catch(error) {
        dispatch(fetchServicesFailure(error.message));
    }
};


export const fetchService = (id) => async(dispatch) => {
    dispatch(fetchServiceRequest());
    try {
      const response = await fetch(`http://localhost:7070/api/services/${id}`);
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      const service = await response.json();
      dispatch(fetchServiceSuccess(service));
    } catch(error) {
        dispatch(fetchServiceFailure(error.message));
    }
};

export const removeService = (id) => async (dispatch) => {
    dispatch(removeServiceRequest(id));
    try {
      const response = await fetch(`http://localhost:7070/api/services/${id}`, {
       method: 'DELETE'
      });
      if (!response.ok) {
          throw new Error(response.statusText);
      }
      dispatch(removeServiceSuccess(id));
      dispatch(fetchServices());
    } catch(error) {
        dispatch(removeServiceFailure(error.message, id));
    }

};
