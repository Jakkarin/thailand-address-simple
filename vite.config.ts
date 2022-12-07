import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ThailandAddressSimple',
            // the proper extensions will be added
            fileName: 'thailand-address-simple'
        },
    },
    plugins: [dts()],
});
