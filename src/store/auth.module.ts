import AuthService from "@/service/auth-service"

const state = {
    profile: [],
    session: null,
    user: [],
    error: "",
    status: false
}
const getters = {
    getProfile(state: { profile: any }) {
        return state.profile
    },
    Session(state: { session: any }) {
        return state.session
    }
}
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
    fetchProfile({ commit }: any, user: { id: any; }) {
        return AuthService.getProfile(user).then(
            (user) => {
                commit("SET_PROFILE", user.data)
                return Promise.resolve(user)
            },
            (error) => {
                commit("SET_ERROR", error)
                return Promise.resolve(error)
            }
        )
    },
    updateProfile({ commit }: any, profile: any) {
        return AuthService.updateProfile(profile).then(
            () => { commit("SET_STATUS") },
            (error) => {
                return Promise.resolve(error)
            }
        )
    },
    getSession({ commit }: any) {
        return AuthService.getSession().then((data: any) => {
            commit("SET_SESSION", data);
            return Promise.resolve(data)
        },
            (error) => {
                commit("SET_ERROR", error);
                return Promise.resolve(error)
            }
        )
    },
    async logout({ commit }: any) {
        return await AuthService.logout()
        commit("logout")
    }
}
const mutations = {
    SET_USER(state: { user: any; }, payload: any) {
        state.user = payload
    },
    SET_PROFILE(state: { profile: any; }, payload: any) {
        state.profile = payload
    },
    SET_SESSION(state: { session: any; }, payload: any) {
        state.session = payload
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