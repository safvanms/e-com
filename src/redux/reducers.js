const initialState = {
     products: [],
     selectedProduct: null,
   };
   
   const productReducer = (state = initialState, action) => {
     switch (action.type) {
       case 'SET_PRODUCTS':
         return { ...state, products: action.payload };
       case 'SELECT_PRODUCT':
         return { ...state, selectedProduct: action.payload };
       default:
         return state;
     }
   };
   
   export default productReducer;