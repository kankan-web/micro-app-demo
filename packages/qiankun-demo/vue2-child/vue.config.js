const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	devServer: {
		port: 8090,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	transpileDependencies: true
})
