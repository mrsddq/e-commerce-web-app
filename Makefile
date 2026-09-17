.PHONY: install verify clean
install:
	cd amazon && npm ci
verify:
	cd amazon && npm test && npm run build
clean:
	rm -rf amazon/dist
