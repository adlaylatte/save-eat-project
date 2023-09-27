import React, { useState } from "react";
import Image from "next/image";
import { EatData, useEatForm } from "./hook";
import { HeartFilled, SearchOutlined } from "@ant-design/icons";
import { Button, Carousel, DatePicker, Input, InputNumber } from "antd";
import { Rating } from 'react-simple-star-rating';
import { AddImgButtonContainer, InputDetailContainer, InputDetailWrap, InputPhotoWrap, InputPlaceInfoContainer, InputTitleContainer, SubmitButtonContainer } from "./styled";
import dayjs from 'dayjs';
import { EditableTagComponent } from '../editableTagComponent';
import { KakaoMap } from '@/components/map/kakaomap'
import { PlaceSearchComponent, PlaceInfo } from '../placeSearchComponent'

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

type InputPlaceInfoProps = {
    onChange(value: PlaceInfo): void,
    value: PlaceInfo | null,
}

type InputPlaceInfoState = {
    PlaceName:string,
    PlaceAddress:string
}

function InputPlaceInfo(props: InputPlaceInfoProps) {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [state, setState] = useState<InputPlaceInfoState>({
        PlaceName:"가게 이름",
        PlaceAddress:"가게 주소"
    });
    
    React.useEffect(() => {
        if(props.value){
            const {name, address} = props.value
            if(name != ""){
                setState({
                    PlaceName:name,
                    PlaceAddress:address
                })
            }
        }

        let container = document.getElementById('placeMap')
        if (!container) return

        let map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(37.511337, 127.012084),
        })

        map.setLevel(8)

        // setState({
        //     ...state,
        //     kakaoMap: map,
        // })
    }, []);

    const onChange = (value:PlaceInfo) => {
        const {name, address} = value

        props.onChange(value)

        setState({
            PlaceName:name,
            PlaceAddress:address
        })
    }

    return (
        <KakaoMap>
            <InputPlaceInfoContainer>
                <div className={"left-box"}>
                    <div className={"map-icon"}>
                        <Image src={"/icon/location.svg"} width={25} height={25} alt={"location"} />
                    </div>
                    <div className={"place-info"}>
                        <div className={"place-name"}>
                            <span>{state.PlaceName}</span>
                        </div>
                        <div className={"place-location"}>
                            <p>{state.PlaceAddress}</p>
                        </div>
                    </div>
                    <Button style={{ position: "absolute", top: "10px", right: "10px" }} size="small" onClick={() => setModalOpen(true)} icon={<SearchOutlined />}>검색</Button>
                </div>
                <div className={"right-box"}>
                    <div id='placeMap' style={{width:142,height:80}}/>
                    {/* <Image src={"/images/temp_place.svg"} width={100} height={100} alt="test" /> */}
                </div>
                
                {isModalOpen && <PlaceSearchComponent SetModalOpen={setModalOpen} onChange={onChange}/>}

            </InputPlaceInfoContainer>
        </KakaoMap>
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

type InputPhotoProps = {
    AddImg(): void
}
function InputPhoto(props: InputPhotoProps) {
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

type InputDetailInfoTag = {
    onChange(value: string[] | null): void,
    value: string[] | null,
}

function InputDetailInfoTag(props: InputDetailInfoTag) {
    return (
        <InputDetailContainer>
            <Image className="info-icon" src={"/icon/tag.svg"} width={icon_WH} height={icon_WH} alt={"tag"} />
            <EditableTagComponent onChange={props.onChange} value={props.value}/>
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
    const AddImg = () => {
        alert("이미지 추가버튼 클릭!");
    }
    // input onChange 이벤트
    const onChangePlaceInfo = (placeInfo: PlaceInfo) => {
        updateData("placeInfo", placeInfo);
        console.log(placeInfo);
    }

    const onChangeDate = (date: Date) => {
        updateData("date", date);
        console.log(date);
    }

    const onChangePrice = (price: number) => {
        updateData("price", price);
        console.log(price);
    }

    const onChangeTag = (tag: string[]) => {
        updateData("tag", tag);
        console.log(tag);
    }

    const onChangeComment = (comment: string) => {
        updateData("comment", comment);
        console.log(comment);
    }

    return (
        <>
            <InputTitleContainer>
                <InputTitle onChange={onChangeTitle} value={data.title} />
                <InputRate onChange={onChange} value={data.rating} />
            </InputTitleContainer>
            <InputPlaceInfo onChange={onChangePlaceInfo} value={data.placeInfo}/>
            <InputPhoto AddImg={AddImg} />
            {/* <AddImgButton onClick={AddImg} /> */}

            <InputDetailWrap>
                <InputDetailInfoDate onChange={onChangeDate} date={data.date} />
                <InputDetailInfoPrice onChange={onChangePrice} value={data.price} />
                <InputDetailInfoTag onChange={onChangeTag} value={data.tag} />
                <InputDetailInfoComment onChange={onChangeComment} value={data.comment} />
            </InputDetailWrap>
            <SubmitButton onClick={() => props.onSubmit(data)} />
        </>
    )
}