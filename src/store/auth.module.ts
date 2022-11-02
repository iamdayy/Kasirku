import router from "@/router";
import AuthService from "@/service/auth-service"

const state = {
    user: [],
    error: "",
    status: false
}
const getters = {}
const actions = {
    register({ commit }: any, user: { email: any; password: any }) {
        return AuthService.register(user).then(
            (user) => {
                commit("SET_USER", user.data);
                commit("SET_STATUS", true)
                return Promise.resolve(user)
            },
            (error) => {
                commit("SET_ERROR", error)
                return Promise.reject(error);
            }
        )
    },
    login({ commit }: any, user: { email: any; password: any; }) {
        return AuthService.login(user).then((user) => {
            commit("SET_USER", user);
            commit("SET_STATUS", true)
            return Promise.resolve(user)
        },
            (error) => {
                commit("SET_ERROR", error)
                return Promise.reject(error);
            })
    },
    logout({ commit }: any) {
        AuthService.logout().then(() => {
            router.push('/login')
            commit("logout")
        }
        );
    }
}
const mutations = {
    SET_USER(state: { user: any; }, payload: any) {
        state.user = payload
    },
    SET_ERROR(state: { error: any; }, payload: any) {
        state.error = payload
    },
    SET_STATUS(state: { status: any; }, value: any) {
        state.status = value
    },
    logout(state: { loggedIn: boolean; user: null; }) {
        state.loggedIn = false;
        state.user = null;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}