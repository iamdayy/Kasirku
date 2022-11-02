import { createStore } from "vuex";
import auth from "./auth.module";
import product from "./product.module";
import cart from "./cart.module";
import order from "./order.module";
const store = createStore({
    modules: {
        auth,
        product,
        cart,
        order,
    }
})

export default store;