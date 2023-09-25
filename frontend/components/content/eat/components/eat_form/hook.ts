import React, { useState } from "react"

export type EatData = {
    title: string,
    rating: number,
    placeInfo: {
        code: string,
        name: string,
        coordinate: {
            lat: number,
            lng: number,
        }
        address: string
    },
    photo: string[],
    date: Date,
    price: number | null,
    tag: string[],
    comment: string,
}

function InitData(): EatData {
    return {
        title: "",
        rating: 0,
        placeInfo: {
            code: "",
            name: "",
            coordinate: {
                lat: 0,
                lng: 0,
            },
            address: ""
        },
        photo: [],
        date: new Date(),
        price: null,
        tag: [],
        comment: "",
    }
}

export function useEatForm(defaultData?: EatData) {
    const [data, setData] = useState(defaultData ?? InitData)
    function updateData<T extends keyof EatData>(key: T, value: EatData[T]) {
        setData((old) => {
            return {
                ...old,
                [key]: value,
            }
        })
    }
    return { data, updateData }
}