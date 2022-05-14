import './main.css'
import { Component, useEffect, useState } from 'react'
import { ButtonPrimary } from '@/styled-components/button-primary';
import { HeaderLoader } from "@/components/header-loader";
import PackageCard from '@/components/package-card/package-card.component';
import { Package } from "@/models";
import { AppStore } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { SocketService, getAllPackages } from '@/services';

import { Subscription } from 'rxjs';
import { createAdapterFromArray, createPackageAdapter } from '@/adapters/packages.adapter';

export const MainComponent = () => {
    const dispatch = useDispatch()


	useEffect(() => {
		SocketService.setDispatch(dispatch)

	}, [])

    const { isLoading } = useSelector((store: AppStore) => store.app);
    const packages: any = useSelector((state: AppStore) => { return state.app.allPackages });
    

    useEffect(() => {

        getAllPackages(dispatch)

    }, [isLoading])

    console.log("packages -------------->", packages)


    return (
        <div id='main'>

            <header>
                <nav className='white'>

                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                    <div className='brand-logo logo'>
                        <img src='./linuxpower_ic.png' width="50" />
                    </div>

                    <ul id="nav-menu" className="">
                        <li><a href="sass.html">Packages</a></li>

                    </ul>

                    {
                        isLoading === true &&
                        <HeaderLoader />
                    }

                </nav>

                <ul id="slide-out" className="sidenav">
                    <li><div className="user-view">
                        <div className="background">
                            <img src="images/office.jpg" />
                        </div>
                        <a href="#user"><img className="circle" src="images/yuna.jpg" /></a>
                        <a href="#name"><span className="white-text name">John Doe</span></a>
                        <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
                    </div></li>
                    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="subheader">Subheader</a></li>
                    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul>

            </header>

            <div className='row list-packages'>

                <h3>All Packages</h3>
                <div className='packages'>

                    {packages &&
                        packages.map((x: any, i: number) =>
                            <PackageCard key={i} pack={x} />
                        )
                    }

                </div>
            </div>
        </div>
    )
}


export default MainComponent