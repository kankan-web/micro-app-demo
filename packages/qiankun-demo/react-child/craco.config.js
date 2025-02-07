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
		configure: (webpackConfig, { env, paths }) => {
			webpackConfig.output = {
				...webpackConfig.output,
				clean: process.env.NODE_ENV === 'production',
				libraryTarget: 'umd', //需要配置umd规范
				globalObject: 'window' //修改不规范的代码格式，避免逃逸沙箱
			}
			return webpackConfig
		}
	},
	babel: {
		plugins: [['import', { libraryName: 'antd', style: true }]]
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				// 修改antd的样式变量
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
