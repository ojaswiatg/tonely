"use server";

import { LOGIN_FORM_SCHEMA, SIGNUP_FORM_SCHEMA } from "@/lib/constants";
import { TLoginFormSchema, TSignupFormSchema } from "@/lib/types";
import { getFormattedZodErrors } from "@/lib/utils";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(creds: TLoginFormSchema) {
    const validation = LOGIN_FORM_SCHEMA.safeParse(creds);
    if (!validation.success) {
        return {
            success: false,
            message: "Failed to sign up",
            form_errors: getFormattedZodErrors(validation.error),
        };
    }

    const supabase = createSupabaseServerClient();

    const data = {
        email: creds.email,
        password: creds.password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return {
            success: false,
            message: "Failed to log in",
            error: error.message,
        };
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(creds: TSignupFormSchema) {
    const validation = SIGNUP_FORM_SCHEMA.safeParse(creds);
    if (!validation.success) {
        return {
            success: false,
            message: "Failed to sign up",
            form_errors: getFormattedZodErrors(validation.error),
        };
    }

    const supabase = createSupabaseServerClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: creds.email,
        password: creds.password,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        return {
            success: false,
            message: "Failed to sign up",
            error: error.message,
        };
    }

    revalidatePath("/", "layout");
    redirect("/");
}
