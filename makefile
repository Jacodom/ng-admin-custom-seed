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
	@cp ./node_modules/ng-admin/build/ng-admin.min.js build/
	@cp ./node_modules/ng-admin/build/ng-admin.min.js.map build/
