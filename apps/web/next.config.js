/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"]
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push("@prisma/client", "prisma");
        }
        return config;
    }
};

export default nextConfig;
