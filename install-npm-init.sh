#!/bin/sh

install_file () {
  cp ./npm-init.js $HOME/.npm-init.js
  echo "Done."
}

while true; do
    read -p "Installing .npm-init.js in ${HOME}. Continue? " yn
    case $yn in
        [Yy]* ) install_file; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
