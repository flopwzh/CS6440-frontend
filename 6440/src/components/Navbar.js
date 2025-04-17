// Filename - "./components/Navbar.js

import React from "react";
import { Nav, NavLink, NavMenu } from "./Navbar/NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" activeStyle>
						Home
					</NavLink>
					<NavLink to="/Upload" activeStyle>
						Upload Image
					</NavLink>
					<NavLink to="/Download" activeStyle>
						Download Image
					</NavLink>
					<NavLink to="/Create" activeStyle>
						Create Patient
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
