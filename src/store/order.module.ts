import orderService from '@/service/order-service';
const state = {

    orderStatus: false,
    orders: [],
    pdf: '',
    pdf_status: false
}
const getters = {
    getInvoice(state: {pdf: any}) {
        return state.pdf;
    },
    getOrdersData(state: { orders: any; }) {
        return state.orders;
    },
    getMinimalOrdersData(state: { orders: any}) {
        return state.orders.filter((x: any, y: number) => y < 3)
    }
}
const actions = {
    async fetchOrders({commit}: any) {
            const data = await orderService.fetchData();
            commit("SetOrderResponse")
            console.log(data);
            commit("SetOrderResponse", data.data);
    },
    async checkout({commit}: any, order: any) {
        try {
        const data = await orderService.addNewOrder(order);

        commit("SetOrderStatus");
        commit("SetOrderResponse", data)
        } catch (error) {
            console.log(error);
        }
    },
    async loadInvoice({ commit }: any, path: any) {
        try {
            const data = await orderService.loadPdf(path);
            commit("Set_Pdf",  data)
            commit("Pdf_Status")
        } catch (error) {
            commit("Set_Pdf", error)
        }
    }
}
const mutations = {
    SetOrderStatus(state: { orderStatus: boolean; }) {
        state.orderStatus = true
    },
    SetOrderResponse(state: { orders: any; }, data: any) {
        state.orders = data;
    },
    Set_Pdf(state: { pdf: any; }, data: any) {
        state.pdf = data
    },
    Pdf_Status(state: { pdf_status: boolean; }) {
        state.pdf_status = true
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}