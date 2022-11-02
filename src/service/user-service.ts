import { User } from "@supabase/supabase-js"
import { reactive } from "vue"

export const users = reactive<{ user: User | Record<string, unknown> }>({
    user: {},
})