import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";          // adjust path
import DesktopNav from "./DesktopNav";
import MobileNav   from "./MobileNav";
import logo from "/logo.svg";

const ADMIN_EMAIL = "admin@pasikuthu.com";               // 🔑 your admin email

const Header = () => {
  const [hideLeft, setHideLeft] = useState("-left-[1000px]");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const menuItems = ["recipes", "resources", "about", "contact"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isAdmin = user?.email === ADMIN_EMAIL;           // ✅ check once here

  return (
    <>
      {/* Desktop Nav */}
      <div className="max-[900px]:hidden">
        <DesktopNav
          menuItems={menuItems}
          logo={logo}
          user={user}
          isAdmin={isAdmin}          // 👈 pass down
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Nav */}
      <div className="min-[900px]:hidden">
        <MobileNav
          menuItems={menuItems}
          logo={logo}
          user={user}
          isAdmin={isAdmin}          // 👈 pass down
          onLogout={handleLogout}
          hideLeft={hideLeft}
          onOpen={() => setHideLeft("left-0")}
          onClose={() => setHideLeft("-left-[1000px]")}
        />
      </div>
    </>
  );
};

export default Header;
