import orderService from "@/service/order-service";
const state = {
  status: false,
  response: [],
};
const getters = {
  getOrdersData(state: { response: any }) {
    return state.response;
  }
};
const actions = {
  async fetchOrders({ commit }: any) {
    try {
    const data = await orderService.fetchData();
    commit("SetOrderResponse");
    commit("SetOrderResponse", data.data);
    } catch (error: any) {
        commit("SetOrderResponse", error.message)
    }
  },
  async updateOrder({commit}: any, payload: any) {
    try {
        const data = await orderService.editOrder(payload);
        commit("EditResponse", data)
    } catch (error: any) {
        commit("EditResponse", error.message)
    }
  },
  async deleteOrder({commit}: any, payload:any) {
    try {
        const response = await orderService.removeOrder(payload);
        commit("DeleteResponse", response);
        commit("DeleteStatus")
    } catch (error: any) {
        commit("DeleteResponse", error.message)
    }
  },
  async checkout({ commit }: any, order: any) {
    try {
      const data = await orderService.addNewOrder(order);

      commit("SetOrderStatus");
      commit("SetOrderResponse", data?.dbData?.at(0));
    } catch (error: any) {
      commit("SetOrderResponse", error.message);
    }
  },
};
const mutations = {
  SetOrderStatus(state: { status: boolean }) {
    state.status = true;
  },
  SetOrderResponse(state: { response: any }, data: any) {
    state.response = data;
  },
  DeleteResponse(state: { response: any; }, data: any) {
    state.response = data;
  },
  DeleteStatus(state: { status: boolean; }) {
    state.status = true;
  },
  EditResponse(state: { response: any; }, data: any) {
    state.response = data;
  },
  EditStatus(state: { status: boolean; }) {
    state.status = true
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
