docker logs -f $(docker ps | grep $npm_package_config_imageName | awk '{print $1}')
