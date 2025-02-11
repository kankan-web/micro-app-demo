import './public-path' //必须，否则报错
import './reset.css'
import reportWebVitals from './reportWebVitals'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, Spin } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/stores/store'
import { router, memoryRouter } from '@/router'
import type { User } from '@/stores/userSlice'
import { setUser } from '@/stores/userSlice'

interface Prop {
	container?: HTMLElement
	path?: string
}
let root: null | ReactDOM.Root = null

function render(props?: Prop) {
	let container: null | HTMLElement = null
	// 如果props有container，则使用props.container
	if (props && props.container) {
		container = props.container
	}
	// 获取容器
	let appContainer = (container ? container.querySelector('#root') : document.getElementById('root')) as HTMLElement

	root = ReactDOM.createRoot(appContainer)

	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<ConfigProvider
					prefixCls="ar4"
					getPopupContainer={node => {
						if (node) {
							return node.parentNode as HTMLElement
						}
						return appContainer
					}}
				>
					<Suspense
						fallback={
							<Spin>
								<div style={{ width: '100%', height: '200px' }}></div>
							</Spin>
						}
					>
						<RouterProvider router={props?.path ? memoryRouter : router} />
					</Suspense>
				</ConfigProvider>
			</Provider>
		</React.StrictMode>
	)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
	render()
}

/**
 * bootstrap: 启动时调用
 * qiankun 框架调用，在微前端应用启动时调用
 * 可以在这里做一些初始化操作
 * 调用时，会传入一个props对象，包含一些微前端应用的信息
 * 应用启动时，会先调用bootstrap，然后调用mount
 */
export async function bootstrap() {
	console.log('[react18] react app bootstraped')
}
/**
 * mount: 挂载时调用
 * qiankun 框架调用，在微前端应用挂载时调用
 * 可以在这里做一些初始化操作
 * 调用时，会传入一个props对象，包含一些微前端应用的信息
 */
export async function mount(props: Prop) {
	window.addEventListener('changeUser', changeUserListener)
	render(props)
}

//监听用户信息变化
function changeUserListener(e: Event) {
	const { detail } = e as CustomEvent<User> // 获取事件的detail
	store.dispatch(setUser(detail)) // 设置用户信息
}

/**
 * unmount: 卸载时调用
 * qiankun 框架调用，在微前端应用卸载时调用
 * 可以在这里做一些清理操作
 * 调用时，会传入一个props对象，包含一些微前端应用的信息
 */
export async function unmount() {
	window.removeEventListener('changeUser', changeUserListener)
	if (root) {
		root.unmount()
	}
}

reportWebVitals(console.log)
