cross-conf-env docker run -e NODE_ENV=local \
    --name $npm_package_config_imageName -d \
    -p $npm_package_config_imagePort:3000 \
    $npm_package_config_imageRepo
