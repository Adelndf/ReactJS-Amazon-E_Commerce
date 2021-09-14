// SET UP THE DATA LAYER ...
import React, {createContext, useContext, useReducer} from 'react'

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//This is how u call it OR use it inside a Components ..
export const useStateValue = () => useContext(StateContext);