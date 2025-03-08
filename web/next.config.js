/** @type {import("next").NextConfig} */
module.exports = {
    experimental: {
        serverActions: {
            allowedOrigins: ["192.168.1.240:3007", "brocksden.ca"],
        },
    },
}