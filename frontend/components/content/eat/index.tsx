import { EatForm } from "./components/eat_form";

export function EatEditContent() {

    const onSubmit = () => {
        alert("저장버튼 클릭");
    }

    return (
        <>
            <EatForm onSubmit={onSubmit} />
        </>
    );
}

export function EatAddContent() {
    const onSubmit = () => {
        alert("저장버튼 클릭");
    }

    const data = {
        title: "윽엑엑",
        rating: 2.5,
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
        price: 9000,
        tag: [],
        comment: "맛있었윽엑",
    }

    return (
        <>
            <EatForm data={data} onSubmit={onSubmit} />
        </>
    );
}

export function EatViewContent() {
    return (null);
}