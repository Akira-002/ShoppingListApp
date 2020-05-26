import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  FETCH_PRODCTS,
  FETCH_PRODCTS_ERROR,
  BEFORE_STATE_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR
} from '../actions/productActions'

export const defaultState = {
  products: [],
  product: {name: {}},
  productsError: null,
  isLoading: false
};

export const productsState = (state = defaultState, action) => {

  const { payload, type } = action
  switch(type) {

    case BEFORE_STATE_PRODUCT:
      return {
        ...state,
        productsError: null,
        isLoading: true,
      }

    case FETCH_PRODCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      }

    case FETCH_PRODCTS_ERROR:
      return {
        ...state,
        productsError: payload,
        isLoading: false
      }

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        name: payload,
        productsError: null,
        isLoading: false,
      }

    case GET_PRODUCT_ERROR:
      return {
        ...state,
        productsError: payload,
        isLoading: false
      }

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [payload, ...state.products],
        productsError: null,
        isLoading: false
      }

    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        productsError: payload,
        isLoading: false
      }

     case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(item => item.id !== payload.deletedID),
        productsError: null,
        isLoading: false
      }

    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        productsError: payload,
        isLoading: false
      }

    default:
      return state
  }
}
