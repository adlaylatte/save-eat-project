import { EatEditContent } from "@/components/content/eat"
import { NavigationHeader, PageLayout } from "@/components/layout";

function EatEditPageHeader() {
    return <NavigationHeader title="수정페이지" />
}

export default function EatEditPage() {
    return <PageLayout
        header={<EatEditPageHeader />}
        content={<EatEditContent />}
    />
}