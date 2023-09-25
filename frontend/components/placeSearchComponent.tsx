import React, { useEffect, useState, useContext, useRef } from 'react'
import styles from 'styles/placeSearchComponent.module.css'
import { MARKER_TYPE, MarkerComponent } from '../components/markerComponent'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Input } from 'antd'

//https://www.npmjs.com/package/@types/kakaomaps
//https://apis.map.kakao.com/web/

//todo
//펼치기하면 해당 상단으로 스크롤 이동?

const MAX_DISPLAYED_SEARCHRESULT: number = 15

export interface placeInfo {
    code: ''
    name: ''
    coordinate: {
        lat: 0
        lng: 0
    }
    address: ''
}

//state 인터페이스
interface State {
    //Geolocation 후크로 받아온 현재 위치
    currentLocation?: {
        lat: number
        lng: number
    }

    //카카오맵 API Place검색 서비스를 통해 받아온 결과
    search?: {
        result: any[] //검색된 가게정보와 같은 실질적인 정보
        status: kakao.maps.services.Status //검색결과 상태
        pagination: kakao.maps.services.Pagination //페이지관련 콜백 및 정보
    }

    //검색결과 지도로 이동 시 사용할 마커의 위도좌도 좌표
    markerPosition?: [number, number]

    kakaoMap?: kakao.maps.Map

    expandItemIndex: number
    selectItemIndex: number
}

interface props {
    PlaceSelectCallback: (info: placeInfo) => void
    SetModalOpen: (isOpen: boolean) => void
}

export function PlaceSearchComponent(props: props) {
    const { Search } = Input

    const [state, setState] = useState<State>({
        currentLocation: undefined,
        search: undefined,
        markerPosition: undefined,
        kakaoMap: undefined,
        expandItemIndex: -1,
        selectItemIndex: -1,
    })

    const searchResultCard = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`

        let container = document.getElementById('map')
        if (!container) return

        let map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(37.511337, 127.012084),
        })

        map.setLevel(8)

        setState({
            ...state,
            kakaoMap: map,
        })

        return () => {
            const scrollY = document.body.style.top
            document.body.style.cssText = ''
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
        }
    }, [])

    const onSearchButtonClick = (value: string) => {
        console.log(value)
        if (value === '') return

        //장소검색 콜백
        var SearchCallback = function (
            result: any[],
            status: kakao.maps.services.Status,
            pagination: kakao.maps.services.Pagination
        ) {
            //검색결과가 정상적으로 반환됐을 때.
            if (
                status === kakao.maps.services.Status.OK ||
                status === kakao.maps.services.Status.ZERO_RESULT
            ) {
                setState({
                    ...state,
                    search: {
                        result: result,
                        status: status,
                        pagination: pagination,
                    },
                })
                //검색결과 에러 발생 시
            } else {
                var status: kakao.maps.services.Status
                var pagination: kakao.maps.services.Pagination

                //state에 저장된 검색결과 비어있는 데이터로 덮어쓰기
                setState({
                    ...state,
                    search: undefined,
                })
            }
        }

        var places = new kakao.maps.services.Places(undefined!)

        places.keywordSearch(value, SearchCallback, {
            location: state.kakaoMap?.getCenter(), //현재 지도의 Center를 지정합니다.
            category_group_code: 'FD6', //카테고리그룹을 음식점으로 지정합니다.
            sort: kakao.maps.services.SortBy.ACCURACY, //정확한 결과로 검색합니다.
            size: MAX_DISPLAYED_SEARCHRESULT, //한 페이지에 몇개의 결과를 띄울 것인지 선택합니다. (기본 15)
        })
    }

    const onPageClick = (isNextButton: boolean) => {
        const pagination = state.search?.pagination
        if (!pagination) return

        const hasRequestPage = isNextButton ? pagination.hasNextPage : pagination.hasPrevPage

        if (!hasRequestPage) return

        isNextButton ? pagination.nextPage() : pagination.prevPage()

        searchResultCard.current?.scrollTo({top: 0,})
    }

    const onExpandLabelClick = (index: number) => {
        var setValue = state.expandItemIndex !== index ? index : -1
        
        setState({
            ...state,
            expandItemIndex: setValue,
        })
    }

    //지도로 이동 버튼 클릭
    const onSelectButtonClick = (element: any, index: number) => {
        const { x: lng, y: lat, id, place_name, road_address_name } = element

        if (!state.kakaoMap) return

        //마커가 지도 중앙에 보이도록 이동합니다.
        //Level(줌)을 먼저 설정해서 Center가 뒤틀리는걸 방지합니다.
        const latlng = new kakao.maps.LatLng(lat, lng)
        state.kakaoMap.setLevel(2)
        state.kakaoMap.setCenter(latlng)

        //선택한 장소에 대한 정보를 Callback으로 반환합니다.
        const placeInfo: placeInfo = {
            code: id,
            name: place_name,
            coordinate: {
                lat: lat,
                lng: lng,
            },
            address: road_address_name,
        }

        props.PlaceSelectCallback(placeInfo)

        //MarkerComponent를 호출하기 위해 state를 set합니다.
        setState({
            ...state,
            markerPosition: [lat, lng],
            selectItemIndex: index,
        })
    }

    //검색결과 출력함수
    function SearchResultReturn() {
        if (!state.search) return <div>검색 결과가 없습니다.</div>

        const jsonString = JSON.stringify(state.search.result)
        const jsonObject = JSON.parse(jsonString)

        //총 검색결과 나누기 15로 몇 개의 페이지가 존재하는지 계산합니다.
        //webpack config의 상수로 선언되어있습니다.
        const maxPage = Math.ceil(state.search.pagination.totalCount / MAX_DISPLAYED_SEARCHRESULT)

        if (maxPage === 0) 
            return <div>검색 결과가 없습니다.</div>

        const pagination = state.search.pagination
        const prevDisplayStyle = pagination.hasPrevPage ? undefined : 'none'
        const nextDisplayStyle = pagination.hasNextPage ? undefined : 'none'

        return (
            <>
                {jsonObject.map((element: any, index: number) => {
                    const { place_name, place_url, category_name, road_address_name, phone } = element

                    const isSelected = state.selectItemIndex === index
                    const isExpanded = state.expandItemIndex === index
                    const expandString = isExpanded ? '접기' : '펼치기'

                    return (
                        <li
                            className={`${styles.SearchCard} ${isSelected ? styles.Selected : ''}`}
                            key={index}
                        >
                            <div className={styles.Top}>
                                <div
                                    className={styles.Title}
                                    onClick={() => onExpandLabelClick(index)}
                                >
                                    <label className={styles.PlaceName}>{place_name}</label>
                                    <label className={styles.Expand}>{expandString}</label>
                                </div>
                                <div className={styles.Buttons}>
                                    <button onClick={() => onSelectButtonClick(element, index)}>선택</button>
                                    <div className={styles.DivideLine} />
                                    <button
                                        className={styles.Url}
                                        onClick={() => window.open(`${place_url}`, '_blank')}
                                    />
                                </div>
                            </div>
                            {isExpanded && (
                                <div className={styles.Content}>
                                    <label className={styles.Category}>
                                        {category_name.replace('음식점 > ', '')}
                                    </label>
                                    <label className={styles.Address}>
                                        {road_address_name}
                                    </label>
                                    <label className={styles.Phone}>
                                        {`전화번호 : ${phone === '' ? '등록되지 않음': phone}`}
                                    </label>
                                </div>
                            )}
                        </li>
                    )
                })}
                <div className={styles.Page}>
                    <LeftOutlined
                        style={{display:prevDisplayStyle}}
                        onClick={() => onPageClick(false)}
                    />
                    <div className={styles.PageNumber}>
                        {`${pagination.current} / ${maxPage}`}
                    </div>
                    <RightOutlined
                        style={{display:nextDisplayStyle}}
                        onClick={() => onPageClick(true)}
                    />
                </div>
            </>
        )
    }

    return (
        <div className={styles.ModalContainer}>
            <div className={styles.ModalBody}>
                <div className={styles.SearchTextContainer}>
                    <Search
                        placeholder='가게명을 입력해주세요.'
                        onSearch={onSearchButtonClick}
                        style={{ width: 250 }}
                    />
                    <button className={styles.CloseButton} onClick={() => props.SetModalOpen(false)}/>
                </div>
                <div className={styles.SearchResultContainer} ref={searchResultCard}>
                    <ul className={styles.SearchList}>{SearchResultReturn()}</ul>
                </div>
                {state.markerPosition ? (
                    <MarkerComponent
                        position={state.markerPosition}
                        markerType={MARKER_TYPE.SEARCH}
                        kakaoMap={state.kakaoMap!}
                    />
                ) : null}
                <div className={styles.mapContainer}>
                    <div id='map' className={styles.kakaoMap} />
                </div>
            </div>
        </div>
    )
}
