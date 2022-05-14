import { io, Socket } from "socket.io-client"

import { getAllPackages } from '@/services';
import { isLoading } from "@/redux/states/application.state"

export class SocketService {
    private static dispatch: any

    static setDispatch(dispatch: any) {
        SocketService.dispatch = dispatch
    }

    static getDispatch() {
        return this.dispatch
    }
}

const socket = io("http://localhost:8080")
socket.on("connect", () => {
    console.log(socket.id)
});

socket.on("disconnect", () => {
    console.log(socket.id)
});

socket.on("install_handler", (data) => {
    
    console.log("Install Handler", data)

    const dispatch = SocketService.getDispatch()
    dispatch(isLoading(false))

    //getAllPackages(dispatch)
})

socket.io.on("reconnect", () => {
    // ...
});

export const emit = (type: string, payload: String) => {
    //_dispatch = dispatch
    const dispatch = SocketService.getDispatch()
    console.log("disss", dispatch)
    dispatch(isLoading(true))
    
    socket.emit(type, payload)
}