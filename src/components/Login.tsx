"use client";

import { login } from "@/actions/auth";
import { AlertContext } from "@/context/alert";
import { EAlertType } from "@/lib/constants";
import { TLoginFormSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LOGIN_FORM_SCHEMA } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty, map } from "lodash-es";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type TLoginFormFields = keyof TLoginFormSchema;

export type TLoginProps = {
    switchToSignupTab: () => void;
    className?: string;
};

export default function Signup({ switchToSignupTab, className }: TLoginProps) {
    const router = useRouter();
    const { pushAlert } = useContext(AlertContext);

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<TLoginFormSchema>({
        resolver: zodResolver(LOGIN_FORM_SCHEMA),
    });

    async function onSubmit(data: TLoginFormSchema) {
        try {
            const response = await login(data);
            if (response.success) {
                router.push("/");
            } else {
                if (!isEmpty(response.form_errors)) {
                    map(response.form_errors, (error) => {
                        setError(error.path as TLoginFormFields, {
                            message: error.message,
                        });
                    });
                } else {
                    pushAlert({
                        id: Date.now(),
                        type: EAlertType.ERROR,
                        message: response?.error ?? "",
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    function loginWithGoogle() {
        // console.log("Logged in with google");
    }

    function loginWithGithub() {
        // console.log("Logged in with github");
    }

    return (
        <div className={cn("h-full w-full grid justify-center", className)}>
            <form className="grid gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <label
                        htmlFor="name"
                        className="input input-bordered flex items-center gap-2"
                    >
                        <div className="i-mdi-email h-4 w-4" />
                        <input
                            {...register("email")}
                            type="text"
                            name="email"
                            placeholder="Email"
                            disabled={isSubmitting}
                            className="w-64"
                        />
                    </label>
                    {errors.email ? (
                        <p className="text-sm text-error">
                            {errors.email.message}
                        </p>
                    ) : null}
                </div>
                <div className="grid gap-2">
                    <label
                        htmlFor="password"
                        className="input input-bordered flex items-center gap-2"
                    >
                        <div className="i-mdi-form-textbox-password h-4 w-4" />
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            disabled={isSubmitting}
                            className="w-64"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <div
                                className={cn(
                                    {
                                        "i-mdi-eye": !showPassword,
                                        "i-mdi-eye-off": showPassword,
                                    },
                                    "h-4 w-4",
                                )}
                            />
                        </button>
                    </label>
                    {errors.password ? (
                        <p className="text-sm text-error">
                            {errors.password.message}
                        </p>
                    ) : null}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary text-white"
                >
                    {isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        "Log in"
                    )}
                </button>
            </form>

            <div className="my-4 mx-auto text-lg font-semibold">OR</div>

            <button
                className="btn btn-outline btn-primary flex items-center justify-center text-black"
                onClick={loginWithGoogle}
            >
                <div className="i-mdi-google h-4 w-4" />
                <p>Log in with Google</p>
            </button>
            <button
                className="btn btn-outline btn-primary flex items-center justify-center text-black mt-4"
                onClick={loginWithGithub}
            >
                <div className="i-mdi-github h-4 w-4" />
                <p>Log in with Github</p>
            </button>
            <p className="text-sm mt-2">
                Don&apos;t have an account?
                <button
                    className="btn btn-primary btn-link -ml-2"
                    onClick={switchToSignupTab}
                >
                    Sign up
                </button>
            </p>
        </div>
    );
}
