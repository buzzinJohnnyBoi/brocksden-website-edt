import Nav from "../../../components/nav/nav";
import Footer from "@/components/footer/footer";
import { headers } from 'next/headers';

export default function DashboardLayout(content) {
    return (
        <>
            <Nav pageName={content.params.id}/>
            {content.children}
            <br></br>
            <Footer />
        </>
    )      
}