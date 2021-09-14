// THE DATA LAYER LOGIC ...
export const initialState = {
    basket: [],
    user: null,
}

// The total ..
export const getBasketTotal = (basket) =>
basket?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {
    console.log(action)
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
            };
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
            /////////////
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket];
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            if (index >= 0) {
                newBasket.splice(index, 1);
            }
            return {
                ...state,
                basket: newBasket,
            };
            /////////////
        default:
            return state;
    }
}

export default reducer;