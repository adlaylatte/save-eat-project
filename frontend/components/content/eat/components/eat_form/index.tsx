import React, { useState } from "react";
import Image from "next/image";
import { EatData } from "./hook";
import { useEatForm } from './hook'
import { SearchOutlined } from "@ant-design/icons";
import { Button, Carousel, DatePicker, Input, InputNumber } from "antd";
import { Rating } from 'react-simple-star-rating';
import { AddImgButtonContainer, InputDetailContainer, InputDetailWrap, InputPhotoWrap, InputPlaceInfoContainer, InputTitleContainer, SubmitButtonContainer } from "./styled";
import dayjs from 'dayjs';
import { EditableTagComponent } from "../EditableTagComponent";

let icon_WH = 30;

type InputTitleProps = {
    onChange(value: string): void
    value: string
}
function InputTitle(props: InputTitleProps) {
    const { value, onChange } = props;
    return (
        <Input className={"title"} value={value} onChange={(event) => onChange(event.target.value)} placeholder="메뉴명" />
    )
}

type InputRateProps = {
    onChange(value: number): void,
    value: number
}
function InputRate(props: InputRateProps) {
    return (
        <Rating
            className="rate"
            allowFraction={true}
            initialValue={props.value}
            onClick={(value) => { props.onChange(value) }}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
        // onPointerMove={onPointerMove}
        /* Available Props */
        />
    );
}
function InputPlaceInfo(props: { onClick(): void }) {
    const { onClick } = props;
    return (
        <InputPlaceInfoContainer>
            <div className={"left-box"}>
                <div className={"map-icon"}>
                    <Image src={"/icon/location.svg"} width={25} height={25} alt={"location"} />
                </div>
                <div className={"place-info"}>
                    <div className={"place-name"}>
                        <span>가게 이름</span>
                    </div>
                    <div className={"place-location"}>
                        <p>가게 위치</p>
                    </div>
                </div>
                <Button style={{ position: "absolute", top: "10px", right: "10px" }} size="small" onClick={onClick} icon={<SearchOutlined />}>검색</Button>
            </div>
            <div className={"right-box"}>
                <Image src={"/images/temp_place.svg"} width={100} height={100} alt="test" />
            </div>
        </InputPlaceInfoContainer>
    );
}

function AddImgButton(props: { onClick(): void }) {
    const { onClick } = props;
    return (
        <AddImgButtonContainer /* onClick={} */>
            <div onClick={onClick} className={"add-img-btn"}>
                <Image src={"/icon/append_img.svg"} width={25} height={25} alt=""></Image>
                <span>사진을 추가해주세요</span>
            </div>
        </AddImgButtonContainer>
    )
}

// interface temp {
//     disabled?: boolean
// }

// function name(props: temp) {

// }

type InputPhotoProps = {
    AddImg(): void
}
function InputPhoto(props: InputPhotoProps) {
    const [] = useState();
    const [isAppend, setIsAppend] = useState<boolean>(false);
    const [imgArr, setImgArr] = useState<string[]>([]);

    React.useEffect(() => {
        setIsAppend(true);
        let ImgArr = [
            "big_cutlet",
            "compose",
            "driver_restaurant",
            "kbbank_gukbab",
        ]
        setImgArr(ImgArr);
    }, []);

    return (
        <InputPhotoWrap>
            <div className="input-container">
                {
                    isAppend ? (
                        <Carousel infinite={false} centerMode={true} draggable={true} rootClassName={"img-carousel"} >
                            {
                                imgArr.map((item) => {
                                    return (
                                        <img className={"appended-img"} src={`/images/${item}.jpg`} alt="" />
                                    )
                                })
                            }
                            <AddImgButton onClick={props.AddImg} />
                        </Carousel>

                    ) : (
                        <AddImgButton onClick={props.AddImg} />
                    )
                }
            </div>
        </InputPhotoWrap>
    );
}

type InputDetailInfoDateProps = {
    onChange(value?: Date): void,
    date: Date,
}
function InputDetailInfoDate(props: InputDetailInfoDateProps) {
    const { date, onChange } = props;
    return (
        <InputDetailContainer>
            <Image className="info-icon" src={"/icon/calander.svg"} width={icon_WH} height={icon_WH} alt={"calander"} />
            <DatePicker inputReadOnly={true} className={"date"} value={dayjs(date)} onChange={(Date) => onChange(Date?.toDate())} placeholder="날짜를 선택하세요." />
        </InputDetailContainer>
    )
}

type InputDetailInfoPriceProps = {
    onChange(value: number | null): void,
    value: number | null,
}
function InputDetailInfoPrice(props: InputDetailInfoPriceProps) {
    const { onChange, value } = props;
    return (
        <InputDetailContainer>
            <Image className="info-icon" src={"/icon/price.svg"} width={icon_WH} height={icon_WH} alt={"price"} />
            <InputNumber className={"price"} value={value} controls={false} placeholder="가격" onChange={(value) => onChange(value)} />
        </InputDetailContainer>
    )
}

function InputDetailInfoTag() {
    return (
        <InputDetailContainer>
            <Image className="info-icon" src={"/icon/tag.svg"} width={icon_WH} height={icon_WH} alt={"tag"} />
            <EditableTagComponent />
        </InputDetailContainer>
    )
}

type InputDetailInfoCommentProps = {
    onChange(value: string): void,
    value: string
}
function InputDetailInfoComment(props: InputDetailInfoCommentProps) {
    const { value, onChange } = props;
    return (
        <InputDetailContainer>
            <Image className="info-icon" src={"/icon/comment.svg"} width={icon_WH} height={icon_WH} alt={"comment"} />
            <Input className={"comment"} value={value} onChange={(event) => onChange(event.target.value)} placeholder="한줄평" />
        </InputDetailContainer>
    )
}

function SubmitButton(props: { onClick: () => void }) {
    const { onClick } = props;
    return <SubmitButtonContainer>
        <Button onClick={onClick} className={"saveBtn"}>Save Eat</Button>
    </SubmitButtonContainer>
}

type EatEditerProps = {
    data?: EatData,
    onSubmit(data: EatData): void
}

export function EatForm(props: EatEditerProps) {
    const { data, updateData } = useEatForm(props.data);

    const onChangeTitle = (value: string) => {
        updateData("title", value);
        console.log(value);
    }

    const onChange = (rate: number) => {
        updateData("rating", rate);
        console.log(rate);
    }

    const SearchPlaceInfo = () => {
        alert("검색버튼 클릭!");
    }
    const AddImg = () => {
        alert("이미지 추가버튼 클릭!");
    }
    // input onChange 이벤트
    const onChangedate = (date: Date) => {
        updateData("date", date);
        console.log(date);

    }
    const onChangeprice = (price: number) => {
        updateData("price", price);
        console.log(price);

    }

    const onChangetag = (tag: string[]) => {

    }

    const onChangecomment = (comment: string) => {
        updateData("comment", comment);
        console.log(comment);

    }

    return (
        <>
            <InputTitleContainer>
                <InputTitle onChange={onChangeTitle} value={data.title} />
                <InputRate onChange={onChange} value={data.rating} />
            </InputTitleContainer>
            <InputPlaceInfo onClick={SearchPlaceInfo} />
            <InputPhoto AddImg={AddImg} />
            {/* <AddImgButton onClick={AddImg} /> */}

            <InputDetailWrap>
                <InputDetailInfoDate onChange={onChangedate} date={data.date} />
                <InputDetailInfoPrice onChange={onChangeprice} value={data.price} />
                <InputDetailInfoTag /* onChange={} value={data.tag} */ />
                <InputDetailInfoComment onChange={onChangecomment} value={data.comment} />
            </InputDetailWrap>
            <SubmitButton onClick={() => props.onSubmit(data)} />
        </>
    )
}