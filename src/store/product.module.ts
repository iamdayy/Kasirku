import dataService from "@/service/product-service";
const state = {
  fetch_status: false,
  save_status: false,
  edit_status: false,
  data: [],
  message: [],
};
const getters = {
  getProductsData(state: { data: any }) {
    return state.data;
  }
};
const actions = {
  async fetchProducts({ commit }: any) {
    try {
      const data = await dataService.loadProducts();
      commit("Fetch_Message");
      commit("Fetch_Responses", data.data);
    } catch (error: any) {
      commit("Fetch_Responses", { message: error.message });
    }
  },
  async addNewProduct({ commit }: any, product: any) {
    try {
      const data = await dataService.addNewProduct(product);
      commit("Save_Message");
      commit("Save_Responses", data.data);
    } catch (error: any) {
      commit("Save_Responses", { message: error.message });
    }
  },
  async editProduct({ commit }: any, product: any) {
    try {
      const response = await dataService.editProduct(product);
      commit("Edit_Message");
      commit("Edit_Responses", response.data);
    } catch (error: any) {
      commit("Edit_Responses", error.message);
    }
  },
  async deleteProduct({ commit }: any, product: { id: any; image: any }) {
    await dataService.removeProduct(product);
    commit("Clear_Data");
  },
};
const mutations = {
  //message sect
  Fetch_Message(state: { fetch_status: boolean }) {
    state.fetch_status = true;
  },
  Save_Message(state: { save_status: boolean }) {
    state.save_status = true;
  },
  Edit_Message(state: { edit_status: boolean }) {
    state.edit_status = true;
  },
  //response sect
  Fetch_Responses(state: { data: any }, data: any) {
    state.data = data;
  },
  Save_Responses(state: { data: any; message: any }, new_data: any) {
    const data = new_data;
    state.data.unshift(data);
    state.message = data;
  },
  Edit_Responses(state: { message: any }, data: any) {
    state.message = data;
  },
  Clear_Data(state: { data: any }, data: any) {
    state.data.filter((item: { id: any }) => item.id !== data.id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
