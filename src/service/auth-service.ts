import { supabase } from "@/supabase/supabase.config";

class AuthService {
    async register(user: { email: any; password: any; }) {
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        });
        if (data) {
            localStorage.setItem("user", JSON.stringify(data));
        }
        return { data, error }
    }
    async login(user: { email: any; password: any; }) {
        const response = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        });
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
    }
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            localStorage.removeItem("user")
        }
        return error;
    }
}

export default new AuthService;