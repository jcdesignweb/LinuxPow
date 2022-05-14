#!/bin/bash
PKG_TO_VERIFY=$1

PKG_EXISTS_OK=$(which $PKG_TO_VERIFY)

if [ "$PKG_EXISTS_OK" != "" ]; then
    echo "1"

else 
    echo "0"
fi