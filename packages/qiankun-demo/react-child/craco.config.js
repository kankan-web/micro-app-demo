const { name } = require('./package')
const path = require('path')
const CracoLessPlugin = require('craco-less')

const config = {
	devServer: {
		port: 8092,
		open: false
	},
	style: {
		css: {
			loaderOptions: {
				modules: {
					auto: true,
					exportLocalsConvention: 'camelCaseOnly'
				}
			}
		}
	},
	webpack: {
		alias: {
			'@': path.resolve('src')
		},
		configure: (webpackConfig, { paths }) => {
			webpackConfig.output = {
				...webpackConfig.output,
				library: `${name}-[name]`,
				libraryTarget: 'umd',
				//webpack5需要吧json
				chunkLoadingGlobal: `webpackJsonp_${name}`,
				globalObject: 'window'
			}
			return webpackConfig
		}
	},
	babel: {
		plugins: [
			[
				'import',
				{
					libraryName: 'antd',
					style: true
				}
			]
		]
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'ant-prefix': 'ar4'
						},
						javascriptEnabled: true
					}
				}
			}
		}
	]
}

module.exports = config
