
const style = {
    backgroundColor: '#26238D!important'
};


const Footer = () => {
    const footerLink = "© 2023 IBS Software.All Rights Reserved."
    const footerUrl = "";
    return (
        <footer className="nga-footer mt-auto bg-primary text-white d-flex-column text-center" >
            <div className="py-3 text-center bg-primary py-1" style={style}>
                <div className="container">
                    <a href="{ footerUrl }">{footerLink}</a>
                </div>
            </div>
        </footer>

    )
}

export default Footer

