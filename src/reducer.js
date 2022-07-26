export const initialState = {
  basket: [],
  productslist: [],
  loggedInUser: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    // Basket Code

    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "ADD_TO_PRODUCTS":
      return {
        ...state,
        productslist: action.item
      };

    case "UPDATE_BASKET":
      let updateIndex = state.basket.findIndex((object) => {
        return object.id === action.item.id;
      });
      console.log(updateIndex);
      if (updateIndex === -1) {
        action.item.quantity = 1;
        return {
          ...state,
          basket: [...state.basket, action.item],
        };
      } else {
        let newItem = state.basket[updateIndex];
        newItem.quantity = newItem.quantity + 1;
        console.log(state.basket);
        return {
          ...state,
          basket: [...state.basket],
        };
      }

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "DATA_PUSHED":
      return {
        ...state,
        dataPushed: action.change,
      };

    case "TO_BASKET":
      return {
        ...state,
        basket: [action.item],
      };

    case "REMOVE_FROM_BASKET":
      let index = -1;
      for (let i = 0; i < state.basket.length; i++) {
        if (state.basket[i].id === action.item.id) {
          index = i;
          break;
        }
      }
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Basket with id " + action.id + " does not exists");
      }

      return {
        ...state,
        basket: newBasket,
      };

    // Basket Code Ends

    // User code started
    case "LOG_IN_USER":
      return {
        ...state,
        loggedInUser: action.newUser,
      };
    default:
      return state;
  }
};

export default reducer;
