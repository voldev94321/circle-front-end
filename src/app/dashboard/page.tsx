'use client';
import LeftSideBar from "@/components/navigation/LeftSideBar";
import RestrictedProvider from "@/providers/RestrictedProvider";

const Dashboard = () => {
    return (
        <RestrictedProvider>
            <div className="bg-primary w-screen h-screen">
                <LeftSideBar/>
            </div>
        </RestrictedProvider>
    );
};

export default Dashboard;