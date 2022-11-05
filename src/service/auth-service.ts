import { supabase } from "@/supabase/supabase.config";

class AuthService {
    async register(user: { email: any; password: any; }) {
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        });
        return { data, error }
    }
    async login(user: { email: any; password: any; }) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password
        });
        return { data, error }
    }
    async updateProfile(user: any) {
        const { error } = await supabase.from('profiles').upsert({ id: user.id, ...user, update_at: new Date() });
        return { error }
    }
    async getProfile(user: { id: any; }) {
        const { data, error, status } = await supabase.from('profiles').select(`username, website, avatar_url`).eq('id', user.id).single();
        return { data, error, status }
    }
    async getSession() {
        const { data, error } = await supabase.auth.getSession()
        return { data, error }
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