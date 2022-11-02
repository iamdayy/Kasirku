import dataService from "@/service/product-service"
const state = {
    fetch_status: false,
    save_status: false,
    data: [],
    message: ''
}
const getters = {
    getProductsData(state: { data: any; }) {
        return state.data;
    },
    getMinimalProductsData(state: {data: any}){
        return state.data.filter((x: any, y: number) => y < 3)
    }
}
const actions = {
    async fetchProducts({ commit }: any) {
        const data = await dataService.loadProducts()
        commit("Fetch_Success")
        console.log(data);
        commit("Data_Fetchted", data.data)

    },
    async fetchProductsByCategory({ commit }: any) {
        const data = await dataService.loadProductsByCategory()
        commit("Fetch_Success")
        console.log(data);

        commit("Data_Fetchted", data.data)
    },
    async addNewProduct({ commit }: any, product: any) {
        const data = await dataService.addNewProduct(product)
        commit("Save_Success");
        commit("Data_Save", data.data);
    },
    async editProduct({ commit }: any, product: any) {
        try {
            const response = await dataService.editProduct(product)
            commit("Edit_success")
            commit("Edit_message", response)
        } catch (error: any) {
            commit("Edit_Message", error.message)
        }
    },
    async deleteProduct({ commit }: any, product: { id: any, image: any }) {
        await dataService.removeProduct(product)
        commit("Clear_Data")
    }
}
const mutations = {
    Fetch_Success(state: { fetch_status: boolean }) {
        state.fetch_status = true;
    },
    Save_Success(state: { save_status: boolean }) {
        state.save_status = true;
    },
    Data_Fetchted(state: { data: any }, data: any) {
        state.data = data;
    },
    Data_Save(state: { data: any; }, new_data: any) {
        state.data.unshift(new_data);
    },
    Clear_Data(state: {data: any}, data: any) {
       state.data.filter((item: { id: any; }) => item.id !== data.id)
    },
    Edit_Message(state: { message: any; }, message: any) {
        state.message = message
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}