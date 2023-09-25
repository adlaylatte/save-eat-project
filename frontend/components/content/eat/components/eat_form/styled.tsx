import styled from "styled-components";

export const InputTitleContainer = styled.div`
    background-color: #fff;
    padding: 15px 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
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
    
`

export const InputPhotoContainer = styled.div``

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
