function Footer() {

    return ( <footer className="Footer" >
       <div>
           <p className="date"> &copy; {new Date().getFullYear()}</p>
           <p className="websitename">website</p>
       </div>
    </footer>);
}
export default Footer;