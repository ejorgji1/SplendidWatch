//Action Types
const SET_WATCH ='watch/SET_WATCH'
const DELETE_WATCH = 'watch/DELETE_WATCH'
const SET_ALL_WATCHES = 'watch/SET_ALL_WATCHES'
const SET_ONE_WATCH = 'watch/SET_ONE_WATCH'
const UPDATE_WATCH = 'watch/UPDATE_WATCH '
const ADD_WATCH = "watch/ADD_WATCH";
const SEARCH_WATCH = "watch/search";

//ACTION CREATORS
export const setWatch = (watch) => ({
    type: SET_WATCH,
    payload: watch,
  });
  
  export const removeWatch = (id) => ({
    type: DELETE_WATCH,
    payload: id,
  });
  
  export const setAllWatches = (watches) => ({
    type: SET_ALL_WATCHES,
    payload: watches,
  });
  
  export const setOneWatch = (watch) => ({
    type: SET_ONE_WATCH,
    payload: watch
  });
  
  export const addWatch = (watch) => ({
    type: ADD_WATCH,
    payload: watch,
  });
  
  export const updateWatch = (watch) => ({
    type: UPDATE_WATCH,
    payload: watch,
  });
  
  export const searchWatch = (search) => ({
    type: SEARCH_WATCH,
    payload: search,
  });

  //Thunks
  export const searchWatchByBrand = (search) => async (dispatch) => {
    const response = await fetch(`/api/watch/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    });
  
    if (response.ok) {
      const results = await response.json();
      dispatch(searchWatch(results));
    } else {
      const errorData = await response.json();
      return errorData;
    }
  };
  
  export const getWatch = (id) => async (dispatch) => {
    const response = await fetch(`/api/watch/${id}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setWatch(data));
    } else {
      console.error("Thunk Error: Bad Req");
    }
  };
  
  export const getAllWatches = () => async (dispatch) => {
    const response = await fetch(`/api/watch`);
    if (response.ok) {
      const data = await response.json();
      dispatch(setAllWatches(data));
    } else {
      console.error("Thunk Error: Bad Req");
    }
  };
  
  export const createNewWatch = (watch) => async (dispatch) => {
    
    const response = await fetch(`/api/watch/new-watch`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: watch,
    });
  
    if (response) {
      const data = await response.json();
     
      dispatch(addWatch(data));
      return data;
    } else {
  
      console.error("Thunk Error: Failed to add business");
    }
  };
  
  export const fetchOneWatch = (id) => async (dispatch) => {
    const response = await fetch(`/api/watch/${id}`);
    if (response.ok) {
      const watch = await response.json();
      dispatch(setOneWatch(watch));
  
    } else {
      const errorData = await response.json();
      console.error("Thunk Error: Failed to add watch", errorData);
    }
  };
  
  export const editWatch = (id, updatedWatch) => async (dispatch) => {

    const response = await fetch(`/api/watch/${id}/edit`, {
       method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: updatedWatch,
    });
  
    if (response.ok) {
      const data = await response.json();
      dispatch(updateWatch(data));
      return data;
    } else {
      console.error("Thunk Error: Failed to edit WATCH");
    }
  };
  
  export const deleteWatch = (id) => async (dispatch) => {

    const response = await fetch(`/api/watch/${id}/delete`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      const data = await response.json();
      dispatch(removeWatch(id));
      return data;
    } else {
      const error = await response.json();
      throw error;
    }
  };

  const initialState = {
    list: [],
    current: null,
    selectedWatch: null,
    search: null
  };

  const watchReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ALL_WATCHES:
        return {
          ...state,
          list: action.payload,
          selectedWatch: action.payload
        };
      case SEARCH_WATCH:
        return {
          ...state,
          search: action.payload,
        };
      case SET_WATCH:
        return { ...state, current: action.payload };
      case SET_ONE_WATCH:
        return { ...state, selectedWatch: action.payload };
      case DELETE_WATCH:
        return { ...state, current: null, selectedWatch: null };
      case ADD_WATCH:
        return { ...state, selectedWatch: action.payload };
      case UPDATE_WATCH:
        return {
          ...state,
          list: state.list.Watches.map((watch) =>
            watch.id === action.payload.id ? action.payload : watch
          ),
          // current:
          //   action.payload.id === state.current.id
          //     ? action.payload
          //     : state.current,
        };
      default:
        return state;
    }
  };
  
  export default watchReducer;
  