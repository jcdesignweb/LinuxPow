import { Component, useEffect } from "react";
import { ButtonPrimary, ButtonDelete } from '@/styled-components';
import { emit } from "@/services";
import { useDispatch, useSelector } from 'react-redux';
import { Package } from "@/models";
import { isLoading } from "@/redux/states/application.state";

import './package-card.css'

/**
 * 
 * @param pack alias of package
 * @returns 
 */
function PackageCard(props: any) {

    const dispatch = useDispatch();

    const btnInstallOnClick = () => {
        console.log("installling", props.pack.cmd)
        
        emit('message', props.pack.command)
    }

    const btnUnisntall = () => {
        console.log("uninstall", props.pack.cmd)
        emit('uninstall', props.pack.command)
    }

    
    
    //const getApiData = async () => await callEndpoint(getCoolMorty());

    return (
        <div className="col s12 m6 l4">
            <div className='package card darken-1'>
                <div className="card-content white-text">
                    <h4>{props.pack.name}</h4>
                    <p>{props.pack.description}</p>
                    
                </div>
                <div className="card-action">
                    <ButtonPrimary className='btn btn-large' onClick={() => btnInstallOnClick()}>Install</ButtonPrimary >

                    {props.pack.isInstalled == "true" && 
                        <ButtonDelete className='btn btn-large' onClick={() => btnUnisntall()}>Remove</ButtonDelete>
                        
                        
                    }

                </div>
            </div>
        </div>
    )
}

export default PackageCard