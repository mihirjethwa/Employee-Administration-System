import React from 'react'
import { Header } from 'antd/lib/layout/layout'
import {Link} from 'react-router-dom'
import './Header.css'
import ATools from "../../assets/header/ATools..svg"
import { Button } from 'antd'

const HeaderMenu=()=>{
    return (
        <Header className="header">
            <div className="logo">
                <img src={ATools} alt="logo"/>
            </div>
            <div className="rightNavSection">
                <Button className="freetrial">
                    Start Free Trial
                </Button>
                <Button className="rightMenuItem">
                    Login
                </Button>
            </div>
        </Header>
    )
}

export default HeaderMenu
