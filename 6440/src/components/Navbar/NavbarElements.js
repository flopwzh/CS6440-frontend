// Filename - ./components/Navbar/NavbarElements.js
 
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
 
export const Nav = styled.nav`
    background:rgb(118, 150, 255);
    height: 50px;
    display: flex;
    justify-content: center;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    padding-bottom: 0;
    z-index: 12;
`;
 
export const NavLink = styled(Link)`
    color:rgb(0, 0, 0);
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 3rem;
    height: 100%;
    cursor: pointer;
    &.active {
        background-color: rgb(166, 187, 255);
        color:rgb(211, 123, 255);
    }
`;
 
export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;
 
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;