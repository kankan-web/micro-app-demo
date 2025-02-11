/**
 * 全局声明
 * 1. 声明window对象
 * 2. 声明__POWERED_BY_QIANKUN__和__INJECTED_PUBLIC_PATH_BY_QIANKUN__
 */
declare global {
	interface Window {
		__POWERED_BY_QIANKUN__: boolean
		__INJECTED_PUBLIC_PATH_BY_QIANKUN__: string
	}
}

export {}
