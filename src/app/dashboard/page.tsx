'use client';
import RestrictedProvider from "@/providers/RestrictedProvider";
import { lazy } from "react";
const LazyWalletConnectButton = lazy(() => import("@/components/button/ConnectWalletButton"));

const Dashboard = () => {
    return (
        <RestrictedProvider>
            <div className="m-4">
                <LazyWalletConnectButton/>
            </div>
        </RestrictedProvider>
    );
};

export default Dashboard;