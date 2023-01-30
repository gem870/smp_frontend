import { Link, useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { authLocations, classLocations } from '../../../../../router/spm-path-locations'
import { hasAccess, NavPermissions } from '../../../../../utils/permissions'
export function ResetPasswordLink(props){
    var location = useLocation()
    var userDetail = localStorage.getItem('userDetail')
    return(
        <>
    
              {
                    hasAccess(NavPermissions.gradeSetting) &&
                       <li className="nav-item">
                       <Link className={`${location.pathname === authLocations.resetPassword ? 'active' : ''} nav-link`} to={`${authLocations.resetPassword}?id=${JSON.parse(userDetail).userAccountId}`}
                       onClick={()=>{
                        props.minisidebar(); 
                       }}>
                       <i className="icon">
                       <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.7688 8.71387H16.2312C18.5886 8.71387 20.5 10.5831 20.5 12.8885V17.8254C20.5 20.1308 18.5886 22 16.2312 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8254V12.8885C3.5 10.5831 5.41136 8.71387 7.7688 8.71387ZM11.9949 17.3295C12.4928 17.3295 12.8891 16.9419 12.8891 16.455V14.2489C12.8891 13.772 12.4928 13.3844 11.9949 13.3844C11.5072 13.3844 11.1109 13.772 11.1109 14.2489V16.455C11.1109 16.9419 11.5072 17.3295 11.9949 17.3295Z" fill="currentColor"></path>
                          <path opacity="0.4" d="M17.523 7.39595V8.86667C17.1673 8.7673 16.7913 8.71761 16.4052 8.71761H15.7447V7.39595C15.7447 5.37868 14.0681 3.73903 12.0053 3.73903C9.94257 3.73903 8.26594 5.36874 8.25578 7.37608V8.71761H7.60545C7.20916 8.71761 6.83319 8.7673 6.47754 8.87661V7.39595C6.4877 4.41476 8.95692 2 11.985 2C15.0537 2 17.523 4.41476 17.523 7.39595Z" fill="currentColor"></path>
                        </svg>
                        </i>
                           <i className="sidenav-mini-icon"> RP </i>
                           <span className="item-name">Reset Password</span>
                       </Link>
                   </li>
}
        </>
    )
}