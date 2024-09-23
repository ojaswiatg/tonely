"use client";

import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { EAuthTabs } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";

type TAuthTabProps = {
    selectedTab: EAuthTabs;
};

export default function AuthTab({ selectedTab }: TAuthTabProps) {
    const [activeTab, setActiveTab] = useState(selectedTab);
    return (
        <div className="h-fit mt-24 w-fit mx-auto md:mt-48">
            <div role="tablist" className="tabs tabs-bordered mb-4">
                <button
                    className={cn("tab", {
                        "tab-active": activeTab === EAuthTabs.LOGIN,
                    })}
                    onClick={() => setActiveTab(EAuthTabs.LOGIN)}
                >
                    Log in
                </button>
                <button
                    className={cn("tab", {
                        "tab-active": activeTab === EAuthTabs.SIGNUP,
                    })}
                    onClick={() => setActiveTab(EAuthTabs.SIGNUP)}
                >
                    Sign up
                </button>
            </div>
            {activeTab === EAuthTabs.LOGIN ? (
                <Login
                    switchToSignupTab={() => setActiveTab(EAuthTabs.SIGNUP)}
                />
            ) : null}
            {activeTab === EAuthTabs.SIGNUP ? (
                <Signup
                    switchToLoginTab={() => setActiveTab(EAuthTabs.LOGIN)}
                />
            ) : null}
        </div>
    );
}
