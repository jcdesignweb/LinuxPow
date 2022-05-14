import axios from 'axios'
import { urlPaths } from '@/utils'
import { setPackages } from '@/redux/states/application.state'


export const getAllPackages = async (dispatch: any) => {
    fetch(`${urlPaths.SERVER_PATH}/packages`)
    .then(response => response.json())
    .then(result => {
        console.log("Result", result)
        dispatch(setPackages(result))
    })
}

export default class MainService {

    
    MainService() {

    }

    static getAllPackages() {
       
        return axios.get<any>('http://localhost:8080/packages', {})
    }

    public static getSplashLocalStorage() {
        return localStorage.getItem("splash") || false
    }

    public static setSplashLocalStorage() {
        localStorage.setItem('splash', 'true')
    }
    

}