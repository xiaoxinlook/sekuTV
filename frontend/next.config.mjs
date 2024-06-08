/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'seku5scym3q.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '3h8tjd9.top',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'mrtoss03.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https', 
            hostname: '888aa111bb.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https', 
            hostname: 'mossimg.xyz',
            port: '',
            pathname: '/LightPicture/**',
          },
          {
            protocol: 'https', 
            hostname: 'seku5scym3q.com',
            port: '',
            pathname: '/logo/**',
          },
          {
            protocol: 'https', 
            hostname: 'mmk73tf.top',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https', 
            hostname: 'baidu.mt-img.cc',
            port: '',
            pathname: '/**',
          },
        ],
        minimumCacheTTL: 6000,
        contentDispositionType: 'inline',
        formats: ['image/avif', 'image/webp'],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      },
};

export default nextConfig;
