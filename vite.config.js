import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  outDir: 'dist',
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, 'src'),
      "@c":resolve(__dirname, "src/components"),
      "/images": "src/assets/images/"
    },
    // 省略文件后缀
    extensions: ['', '.js', '.json', '.vue', '.scss', '.css']
  },
  build: {
    target: 'es2015',
    outDir: 'dist', //指定输出路径
    assetsDir: 'static/img/', // 指定生成静态资源的存放路径
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        // project: resolve(__dirname, "project.html")
      },
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            const arr = id.toString().split('node_modules/')[1].split('/')
            switch (arr[0]) {
              case '@naturefw': // 自然框架
              case '@popperjs':
              case '@vue':
              case 'element-plus': // UI 库
              case '@element-plus': // 图标
                return '_' + arr[0]
                break
              default:
                return '__vendor'
                break
            }
          }
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/name-[hash].[ext]"
      },
      brotliSize: false, // 不统计
      target: 'esnext', 
      minify: 'esbuild' // 混淆器，terser构建后文件体积更小
    }
  },
  server: {
    hmr: true, //开启热更新
    host: '0.0.0.0',
    port: 8080, // 修改端口
    open: true, // 是否自动在浏览器打开
    https: false, // 是否开启 https
    // 反向代理  项目中通过import.meta.env.VITE_APP_BASEAPI来获取对应环境的值
    proxy: {
      '/api': {
        target: 'https://blog.csdn.net/weixin_45292658',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
