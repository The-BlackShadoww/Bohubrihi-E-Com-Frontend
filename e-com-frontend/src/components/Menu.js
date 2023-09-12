import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import { signOut, isAuthenticated } from "../utils/auth";
import { userInfo } from "../utils/auth";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
];
const navLinks_2 = [
    { name: "Home", href: "/" },
    // { name: "Dashboard", href: "/user/dashboard" },
    { name: "Dashboard", href: `/${userInfo().role}/dashboard` },
];

//! What is useLocation hook in react ????
const Menu = () => {
    const navigate = useNavigate();

    let navBar = null;
    if (!isAuthenticated()) {
        navBar = navLinks.map((link) => {
            const navLinks = (
                <NavLink
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) => {
                        return isActive ? "activeBtn" : "btn";
                    }}
                >
                    {link.name}
                </NavLink>
            );
            return navLinks;
        });
    } else {
        navBar = navLinks_2.map((link) => {
            const navLinks = (
                <div className="flex">
                    <NavLink
                        key={link.name}
                        to={link.href}
                        className={({ isActive }) => {
                            return isActive ? "activeBtn" : "btn";
                        }}
                    >
                        {link.name}
                    </NavLink>
                    <div
                        className="btn cursor-pointer"
                        onClick={() => {
                            signOut(() => {
                                navigate("/login");
                            });
                        }}
                    >
                        Logout
                    </div>
                </div>
            );
            return navLinks;
        });
    }

    // const logout = (
    //     <div
    //         className="btn cursor-pointer"
    //         onClick={() => {
    //             signOut(() => {
    //                 navigate("/login");
    //             });
    //         }}
    //     >
    //         Logout
    //     </div>
    // );

    return (
        <div className="flex">
            <nav className="w-full py-10">{navBar}</nav>
        </div>
    );
};

export default Menu;

//! =========================== v-1 ==========================================
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import "./Menu.css";
// import { signOut, isAuthenticated } from "../utils/auth";

// const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Login", href: "/login" },
//     { name: "Register", href: "/register" },
// ];

// //! What is useLocation hook in react ????
// const Menu = () => {
//     const navigate = useNavigate();

//     const navBar = navLinks.map((link) => {
//         const navlinks = (
//             <NavLink
//                 key={link.name}
//                 to={link.href}
//                 className={({ isActive }) => {
//                     return isActive ? "activeBtn" : "btn";
//                 }}
//             >
//                 {link.name}
//             </NavLink>
//         );

//         return navlinks;
//     });

//     const logout = (
//         <div
//             className="btn cursor-pointer"
//             onClick={() => {
//                 signOut(() => {
//                     navigate("/login");
//                 });
//             }}
//         >
//             Logout
//         </div>
//     );

//     return (
//         <div className="flex">
//             <nav className="w-full py-10">{navBar}</nav>
//             {logout}
//         </div>
//     );
// };

// export default Menu;
