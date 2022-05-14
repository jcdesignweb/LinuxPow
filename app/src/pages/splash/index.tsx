import { Component } from 'react'
import { ButtonPrimary } from '@/styled-components/button-primary';
import MainService from '@/services/main.service'

class SplashComponent extends Component {

    btnOnClick() {

        MainService.setSplashLocalStorage()
        window.location.replace("http://localhost:3000/");
    }

    render() {
        return (
            <div>
                <br /><br />
                <header>
                    <div className='container'>
                        <div className='center'>
                            <img src='logo.png' width="800"/>
                            <h4>a new way to start up our Linux config. Ideally for OS virgens</h4>
                        </div>
                        
                    </div>

                </header>

                <div id='content'>
                    <div className='container'>
                        <br />
                        <div className='center'>
                        <ButtonPrimary className='waves-effect waves-light btn-large' onClick={this.btnOnClick}>Let's start! </ButtonPrimary>
                        </div>
                        
                    </div>
                </div>
            </div>

        )
    }
}

export default SplashComponent