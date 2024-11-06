/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        addres: '172.16.15.134',
      },
    images:{
        domains:['172.16.15.134','192.168.1.47']
    }
};

export default nextConfig;
