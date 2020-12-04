// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
// import AvatarLogin from '../../shared/assets/images/Avatar-login.png';
// import AvatarNotLogin from '../../shared/assets/images/Avatar-not-login.png';
// import MessageIcon from '../../shared/assets/images/Message.png';
// import RingIcon from '../../shared/assets/images/Ring.png';
// import AdvenceIcon from '../../shared/assets/images/Advenge.png';
// import { getLoginDatas, logout } from '../login/login-thunk'
// import { getLoginUrl } from '../../shared/util/url-utils';
// import './common.scss';


// function Header(props) {
    
//     const { getLoginDatas, logout } =  props;
    
    
//     const LoginBox = () => {
//         return (
//             <React.Fragment>
//                 <span className="profile-icon">
//                     <img src={AvatarNotLogin} alt=""/>
//                 </span>
//                 <span className="btn-login" onClick={login}>ログイン</span>
//             </React.Fragment>
//         )
//     }

//     const AuthBox = ({userData}) => {
//         return (
//             <React.Fragment>
               
//                     <span className="profile-icon">
//                         <img style={{width: '85%'}} src={AvatarLogin} alt=""/>
//                     </span>
//                     <Dropdown as={ButtonGroup}>
//                         <DropdownButton id="dropdown-basic-button" title={userData.lastName+ " " + userData.firstName}>
//                             <Dropdown.Item as="button" onClick={logoutAction}>ログアウト</Dropdown.Item>
//                         </DropdownButton>
//                     </Dropdown>
                
//             </React.Fragment>
//         )
//     }
    
//     const logoutAction =  async () => {      
//         await logout(); 
//         window.location.href = "/"
        
//     }

//     const login = () => {
//         getLoginDatas();
//         window.location.href = getLoginUrl();
//     }

//     let userDatas = {}
//      if(Object.keys(account).length > 0) {
//        userDatas = account;
//     }
//     useEffect(()=>{
//         getLoginDatas();
//     },[])
    
//     let Element;
//     if (userDatas && !userDatas.login) {
//         Element = <LoginBox />
//     } else {
//         Element = <AuthBox userData={userDatas}/>
//     }
//         return (
//             <React.Fragment>
//                 <header className="navbar pcoded-header header-dark headerpos-fixed">
//                     <div className="collapse navbar-collapse">
//                         <ul className="navbar-nav ml-auto">
//                             <li className="mr-4">
//                                 {Element}
//                             </li>
//                             <li>
//                                 <Link to="">
//                                     <img className="icon feather" src={MessageIcon} alt=""/>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="">
//                                     <img className="icon feather" src={RingIcon} alt=""/>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="">
//                                     <img className="icon feather" src={AdvenceIcon} alt=""/>
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </header>
//             </React.Fragment>
//         )
// }
// const mapStateToProps = ({loginReducer}) => {
//     return {
//         isAuthenticated : loginReducer.isAuthenticated,
//         account : loginReducer.account,
//         idToken : loginReducer.idToken
//     };
// };
// const mapDispatchToProps = {
//     getLoginDatas,
//     logout
// };
// export default connect(mapStateToProps,mapDispatchToProps)(Header);