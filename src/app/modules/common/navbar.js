// import React, { useState } from "react";
// import "./common.scss";
// import menus from "./../../shared/layout/MenuItem";
// import LogoIcon from "../../shared/assets/images/logo.png";
// import LogoTitle from "../../shared/assets/images/logo-title.png";
// import SideNav, {
//   Toggle,
//   Nav,
//   NavItem,
//   NavIcon,
//   NavText,
// } from "@trendmicro/react-sidenav";
// import styled from "styled-components";
// const navWidthCollapsed = 40;
// const navWidthExpanded = 190;

// function Side(props) {
//   const [expand, setExpand] = useState(false);

//   const onToggle = () => {
//     setExpand(!expand);
//     props.onToggleChild(expand);
//   };

//   const NavHeader = styled.div`
//     display: ${(props) => (props.expanded ? "none" : "block")};
//     color: #fff;
//     margin-top: 20px;
//   `;

//   return (
//     <SideNav
//       style={{ width: expand ? navWidthCollapsed : navWidthExpanded }}
//       onToggle={onToggle}
//       expanded={!expand}
//     >
//       <NavHeader expanded={expand}>
//         <div className="b-brand">
//           <img width="30px" src={LogoIcon} alt="logo" />
//           <img width="70%" src={LogoTitle} alt="機労材マッチングサイト" />
//           <span className="icon-collapse"></span>
//         </div>
//       </NavHeader>
//       <Toggle />
//       <Nav>
//         {menus.map((item, index) => (
//           <React.Fragment key={index}>
//             <NavItem eventKey="home">
//               <NavIcon>
//                 <a href={item.link} className={item.disable ? "disabled" : ""}>
//                   <img
//                     style={{ width: 15, height: 15 }}
//                     src={item.srcImg}
//                     alt=""
//                   />
//                 </a>
//               </NavIcon>
//               <NavText>
//                 <a href={item.link} className={item.disable ? "disabled" : ""}>
//                   <span>{item.text}</span>
//                 </a>
//               </NavText>
//             </NavItem>
//           </React.Fragment>
//         ))}
//       </Nav>
//     </SideNav>
//   );
// }

// export default Side;
