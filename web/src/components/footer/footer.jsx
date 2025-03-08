import './footer.css';

function Footer() { 
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className='footer'>
            <p>{year} brocksden.ca</p>
            <div className='line'></div>
            <p>2719 Perth Line 37 Perth East, ON Canada N5A 6S2</p>
        </div>
    );
}
 
export default Footer;