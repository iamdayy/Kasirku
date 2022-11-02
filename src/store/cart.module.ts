function updateLocalStorage(cart: any) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  const state = {
    cart: [],
  };
  
  const getters = {
    productQuantity: (state: { cart: any[]; }) => (product: { id: any; }) => {
      const item = state.cart.find((i: { id: any; }) => i.id === product.id);
  
      if (item) {
        return item.quantity;
      } else {
        return null;
      }
    },
    cartTotalPrice: (state: { cart: any[]; }) => {
      return state.cart.reduce((total: number, product: { price: number; quantity: number; }) => {
        return total + product.price * product.quantity;
      }, 0);
    },
  };
  
  const mutations = {
    addToCart(state: { cart: any[]; }, product: { id: any; }) {
      const item = state.cart.find((i: { id: any; }) => i.id === product.id);
  
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
  
      updateLocalStorage(state.cart);
    },
  
    removeFromCart(state: { cart: any[]; }, product: { id: any; }) {
      const item = state.cart.find((i: { id: any; }) => i.id === product.id);
  
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cart = state.cart.filter((i: { id: any; }) => i.id !== product.id);
        }
      }
    },
  
    updateCartFromLocalStorage(state: { cart: any; }) {
      const cart = localStorage.getItem("cart");
  
      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
  };
  