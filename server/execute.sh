#!/bin/bash
PKG_TO_INSTALL=$1

RESPONSE_CODE_ALREADY_EXISTS=100
RESPONSE_CODE_SUCCESS=101

MY_SUDO_PASS="JCdesign"


PKG_EXISTS_OK=$(dpkg-query -W --showformat='${Status}\n' $PKG_TO_INSTALL|grep "install ok installed")

if [ "$PKG_EXISTS_OK" != "" ]; then
  echo $RESPONSE_CODE_ALREADY_EXISTS 
  exit
fi

echo $MY_SUDO_PASS | sudo -S apt install $PKG_TO_INSTALL -y 2> /dev/null > /dev/null


PKG_EXISTS_OK=$(dpkg-query --list $PKG_TO_INSTALL 2>/dev/null)
if [ "" != "$PKG_EXISTS_OK" ]; then
  echo $RESPONSE_CODE_SUCCESS 
  exit
  
fi



