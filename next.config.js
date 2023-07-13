// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    experimental: {
        outputFileTracingIgnores: ['**framer-motion**'],
    },
}

module.exports = nextConfig
