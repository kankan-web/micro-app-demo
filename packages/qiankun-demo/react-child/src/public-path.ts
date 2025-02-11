//* eslint-disable */
// @ts-nocheck
// @ts-ignore

// 动态设置 webpack publicPath，根据是否是微前端应用来设置
if (window.__POWERED_BY_QIANKUN__) {
	__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
