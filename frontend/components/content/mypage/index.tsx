import React from "react";
import { UserInfo } from "./components/mypage";

export function MyPageContent() {

    const tempUserInfo = {
        name: "케인인님",
        email: "moongtang@igonana.com",
        record_eat: 3000
    }

    return (
        <>
            <UserInfo user_info={tempUserInfo} />
        </>
    );
}