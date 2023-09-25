import { EatAddContent } from "@/components/content/eat"
// import { useRouter } from "next/router"
import { NavigationHeader, PageLayout } from "@/components/layout";

function EatAddPageHeader() {
    return <NavigationHeader title="수정페이지" />
}

export default function EatAddPage() {
    // const { eat_id } = useRouter().query
    return <PageLayout
        header={<EatAddPageHeader />}
        content={<EatAddContent />}
    />
    {/* EatEditPage: {eat_id} */ }


}