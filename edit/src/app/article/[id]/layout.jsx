import Nav from "../../../components/nav/nav";
import Footer from "@/components/footer/footer";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Nav/>
            {children}
            <br></br>
            <Footer />
        </>
    )      
}
