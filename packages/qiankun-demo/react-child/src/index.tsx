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

debugger
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
	// 如果props有path，则使用memoryRouter
	if (props?.path) {
		//memoryRouter的作用：在微应用中，使用memoryRouter来实现路由导航
		memoryRouter.navigate(props.path)
	}
}

//-------------为了避免根 id #root 与其他的 DOM 冲突，需要限制查找范围。-------------------
if (!window.__POWERED_BY_QIANKUN__) {
	render()
}

function changeUserListener(e: Event) {
	store.dispatch(dispatch => {
		dispatch(setUser((e as CustomEvent<User>).detail))
	})
}

export async function bootstrap() {}
export async function mount(props: Prop) {
	render(props)
	window.addEventListener('changeUser', changeUserListener)
}
export async function unmount() {
	root && root.unmount()
	window.removeEventListener('changeUser', changeUserListener)
}

reportWebVitals(console.log)
