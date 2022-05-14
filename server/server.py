# pip install -r requirements.txt

from aiohttp import web
import aiohttp_cors
import os
import locale
import socketio
import subprocess
import shlex

EVENT_INSTALL_HANDLER = "install_handler"

locale.setlocale(locale.LC_ALL, 'en_US.utf8')

# creates a new Async Socket IO Server
sio = socketio.AsyncServer(cors_allowed_origins='*')


CLIENT_URL_CORS = "*"


async def getAllPackages(request):
    print("Getting all packages..")

    packages = [
        {
            "name": "mc",
            "description": "Midnight Commander (MC) is a text-based Command Line Interface (CLI) program. It is particularly useful when a GUI is not available but can also be used as a primary file manager in a terminal session even when you are using a GUI.",
            "command": "mc"
        },
        {
            "name": "nano",
            "description": "Nano command to edit any file by the Shell",
            "command": "nano"
        }
    ]

    for package in packages:
        isInstalled = verify_package(package["command"])
        print("IsInstalled for command " + package["command"] + " eq:" + isInstalled)
        if isInstalled == '1':
            package["isInstalled"] = "true"
        else:
            package["isInstalled"] = "false"

    return web.json_response(packages)

# Creates a new Aiohttp Web Application
app = web.Application()
cors = aiohttp_cors.setup(app)

resource = cors.add(app.router.add_resource("/packages"))
route = cors.add(
    resource.add_route("GET", getAllPackages), {
        CLIENT_URL_CORS: aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers=("X-Custom-Server-Header",),
            allow_headers=("X-Requested-With", "Content-Type"),
            max_age=3600,
        )
    })


# Binds our Socket.IO server to our Web App
# instance
sio.attach(app)

# we can define aiohttp endpoints just as we normally
# would with no change


async def index(request):
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

# If we wanted to create a new websocket endpoint,
# use this decorator, passing in the name of the
# event we wish to listen out for


@sio.on('message')
async def print_message(sid, package_to_install):
    # When we receive a new event of type
    # 'message' through a socket.io connection
    # we print the socket ID and the message
    print("Socket ID: ", sid)

    await installer(package_to_install)

@sio.on('uninstall')
async def unsintall(sid, package):
    print("Uninstalling: ", package)

    shfile = "sh ./remove.sh " + package
    print("EC " + shfile)
    cmd = subprocess.getoutput(shfile)

    print("deleting " + cmd)
    await sio.emit(
        EVENT_INSTALL_HANDLER,
        {'response': {'cmd': cmd}}
    )
    return cmd

def verify_package(package):
    shfile = "sh ./verify.sh " + package
    cmd = subprocess.getoutput(shfile)
#    print(shfile + " : "  + cmd)
    return cmd


async def installer(package_to_install):
    print("verifing package.." + package_to_install)

    cmd = subprocess.getoutput("sh ./execute.sh " + package_to_install)
    print(cmd)

    await sio.emit(
        EVENT_INSTALL_HANDLER,
        {'response': {'cmd': cmd}}
    )


# We bind our aiohttp endpoint to our app
# router
#app.router.add_get('/', index)

# We kick off our server
if __name__ == '__main__':
    web.run_app(app)
