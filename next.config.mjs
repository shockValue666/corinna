/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images:{
        remotePatterns:[
            {protocol:"https",hostname:"wordpress-1309640-4775910.cloudwaysapps.com"},
            {protocol:"https",hostname:"wordpress-1311038-4782389.cloudwaysapps.com"}
        ]
    }
};

export default nextConfig;
