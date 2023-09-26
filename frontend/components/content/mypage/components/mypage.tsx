import React from "react";
import styled from "styled-components";

type UserInfoProps = {
    user_info: {
        name: string,
        email: string,
        record_eat: number
    }
}

const MyPageContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    margin: 20px 20px 0;
    padding: 20px 10px;
`

const UserInfoContainer = styled.ul`
    .user-name {
        h2 {
            font-weight: 600;
        }
    }
    .user-email-box {
        .user-email {}
        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            margin: 15px auto 0;
            background: #ff6347;
        }
    }
    .save-foot-count {
        margin: 0;
        text-align: center;
        strong {
            font-weight: 600;
            em {
                vertical-align: top;
            }
        }
    }
`

export function UserInfo(props: UserInfoProps) {
    const { user_info } = props;
    return (
        <MyPageContainer>
            <UserInfoContainer>
                <li className={"user-name"}>
                    <h2>{user_info.name}</h2>
                </li>
                <li className={"user-email-box"}>
                    <p className={"user-email"}>{user_info.email}</p>
                </li>
                <li className={"save-foot-count"}>
                    <strong>지금까지 기록한 음식 <em>{user_info.record_eat}</em>개</strong>
                </li>
            </UserInfoContainer>
        </MyPageContainer>
    );
}

export function name() {

}

// export function MyPageView() {

//     return (
//         <>
//             <UserInfo email="moongtang@igonan.com" name="케인인님" record_eat={2} />
//         </>
//     );
// }