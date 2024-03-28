/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function RestrictedProvider
({
  children,
}: {
  children: React.ReactNode;
}) {
    const {authState} = useSelector((state: any) => state.auth);
    const router = useRouter();

    React.useEffect(() => {
        if(!authState){
            router.push("/");
        }
    }, [authState])

    return authState && (
        <div>
            {children}
        </div>
    );
}