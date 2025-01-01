import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
      images:{
            remotePatterns:[
                  {
                        hostname:'res.cloudinary.com',
                        protocol:'https'
                  }
            ]
      },
      typescript:{
            ignoreBuildErrors:true
      }
};

export default nextConfig;
