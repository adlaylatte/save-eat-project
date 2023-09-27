import styled from "styled-components";

export const InputTitleContainer = styled.div`
    background-color: #fff;
    padding: 15px 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .title {
        width: 320px;
        /* border: 0; */
        text-align: center;
        font-size: 36px;
        font-weight: bold;
    }
    .rate {
        margin-top: 10px;
    }
`

export const InputPlaceInfoContainer = styled.div`
    margin: 15px 0;
    height: 80px;
    background: #fff;
    display: flex;
    .left-box {
        height: 100%;
        flex: 2;
        display: flex;
        align-self: center;
        padding: 0 15px;
        position: relative;
        align-items: center;
        .map-icon {}
        .place-info {
            text-align: center;
            .place-name {}
            .place-location {
                
            }
        }
    }
    .right-box {
        flex: 1;
        width: 100%;
        height: 100%;
        background-color: #ddd;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`

export const AddImgButtonContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 380px;
    height: 200px;
    background: #ddd;
    border-radius: 5px;

    .add-img-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: #ddd;
        border-radius: 5px;
        img {
            display: block;
        }
        span {
            display: block;
            padding-top: 10px;
            font-weight: 600;
        }
    }
`

export const InputPhotoWrap = styled.div`
    /* width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center; */
    padding: 15px 0;
    width: 100%;
    background-color: #fff;
    /* height: 260px; */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .input-container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .img-carousel {
            width: 100%;
            height: 100%;
            .slick-slider {
                .slick-list {
                    overflow: visible;
                }
            }
            .appended-img {
                width: 100%;
                height: 200px;
                padding: 0 5px;
                object-fit: cover;
            }
            .add-img-btn {
                width: 100%;
                height: 100%;
            }
        }
        .add-img-btn {
            width: 100%;
            height: 100%;
        }
    }
`

export const InputDetailWrap = styled.div`
    padding: 10px;
    background: #fff;
`
export const InputDetailContainer = styled.div`
    display: flex;
    /* margin: 15px 0 0; */
    &+& {
        padding: 5px 0 0;
    }
    /* padding: 5px 0; */
    .info-icon {
        margin: 0 5px 0 0;
    }
    .date {
        border: 0;
        
    }
    .price {
        border: 0;
        width: 100%;
    }
    .comment {
        border: 0;
        width: 100%;
    }
`


export const SubmitButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .saveBtn {
        width: 80%;
        color: #ff6347;
    }
`
