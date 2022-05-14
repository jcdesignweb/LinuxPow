MY_SUDO_PASS="JCdesign"

PKG_TO_VERIFY=$1

echo $MY_SUDO_PASS | sudo -S apt remove $PKG_TO_VERIFY -y 2> /dev/null > /dev/null
echo $MY_SUDO_PASS | sudo -S apt purge $PKG_TO_VERIFY -y 2> /dev/null > /dev/null
echo $MY_SUDO_PASS | sudo -S apt autoremove -y 2> /dev/null > /dev/null

PKG_EXISTS_OK=$(which $PKG_TO_VERIFY)

if [ "$PKG_EXISTS_OK" != "" ]; then
    echo "0"
else 
    echo "1"
fi
