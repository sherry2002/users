import React,{ useEffect, useState } from 'react'
import './sidebar.css';
import { NavLink } from 'react-router-dom';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const Sidebar = () => {
    const listData = [
      {
        icon: <i class="bi-card-list"></i>,
        name: "User Form",
        link: "/"
      },
      {
        icon: <i class="bi-table"></i>,
        name: "User Table",
        link : "/users"
      },
    ]
    const [toggle,setToggle] =useState(false);
    const [isActive, setIsActive] = useState(0);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleLocationChange = () => {
        if (window.location.pathname === "/users" && isActive !== 1) {
          setIsActive(1);
        } else if (window.location.pathname !== "/users" && isActive !== 0) {
          setIsActive(0);
        }
    };

    useEffect(()=>{
    if (window.location.pathname === "/users" && isActive !== 1) {
        setIsActive(1);
        } else if (window.location.pathname !== "/users" && isActive !== 0) {
        setIsActive(0);
        }
     window.addEventListener('popstate', handleLocationChange);

     function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
     // Clean up the event listener when the component unmounts
     return () => {
       window.removeEventListener('popstate', handleLocationChange);
       window.removeEventListener('resize', handleResize);
     };      
    },[isActive])

    useEffect(()=>{
     if(windowDimensions.width <= 650){
        setToggle(false)
     }
    },[windowDimensions])

  return (
    <div className={`main_sidebar ${toggle ? "min_width" : "full_width"}`}>
      <i className="bi-list list_icon" onClick={()=>setToggle(!toggle)}></i>
      <div>
       <ul className="sidebar_list">
         {
            listData.map((list,index)=>{
              return <SidebarItem key={index} index icon={list.icon} content={list.name} link={list.link} isVisible={!toggle}  isActive={isActive == index} onClick={()=>setIsActive(index)}/>
            })
         }
       </ul>
      </div>
    </div>
  )
}


const SidebarItem = ({icon, content, isVisible,link,isActive,onClick}) => (
    <NavLink className={`link `} to={link}>
        <li className={`${isActive ? "active" : ""} ${isVisible ? "list_name" : "list_noName"}`} onClick={onClick}>
        {icon}
        {isVisible && <span className='sidebar_content'>{content}</span>}
        </li>
    </NavLink>
  );

export default Sidebar
