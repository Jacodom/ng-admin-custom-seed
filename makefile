.PHONY: build

install:
	@npm install

build: copy-ng-admin
	@./node_modules/.bin/webpack  --progress --colors --devtool source-map
	@echo "**************************************************"
	@echo "* Project Build! to exec the app just do 'make start' *"
	@echo "**************************************************"

start:
	@npm start

copy-ng-admin:
	@cp ./app/bower_components/ng-admin/build/ng-admin.min.js app/build/
	@cp ./app/bower_components/ng-admin/build/ng-admin.min.js.map app/build/
