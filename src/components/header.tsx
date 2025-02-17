"use client";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import {urlConst} from "@/consts/path-consts";

function Header() {
  const router = useRouter();
  const sendToLogin = () => {
    router.push(urlConst.loginRedirect);
  };
  const sendToRegister = () => {
    router.push("/Register");
  };
  const sendToHome = () => {
    router.push(urlConst.dashboardRedirect);
  };
  const deleteToken = () => {
    localStorage.clear();
    router.push(urlConst.loginRedirect);
  }
  const [HasTokken, setHasTokken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasTokken(!!token);
  }, [router]);


  return (
    <header className="Header">
      <h1 className="logo">My Website</h1>
      <nav>
        <div className="nav">
          { HasTokken?(
              <>
          <button className="home" onClick={sendToHome}>
            Home
          </button>
                <button className="contact" onClick={deleteToken}>Logout</button>
              </>
          ): (
              <>
          <button className="services" onClick={sendToLogin}>
            Login
          </button>

                <button className="about" onClick={sendToRegister}>
                  Register
                </button>
              </>
          ) }
        </div>

      </nav>
    </header>
  );
}
export default Header;
