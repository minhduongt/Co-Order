/** @type {import('next').NextConfig} */
require("dotenv").config({ path: `./config/.env.${process.env.NODE_ENV}` });

const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "https://stg-api-co-order.tk/api/v1",
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDg60YgpM25ySjOjSovffDgrbephhs4Mdc",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "coorder-login.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "coorder-login",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "coorder-login.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "701228866647",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:701228866647:web:e0f4810236be685792d712",
  },
  // trailingSlash: true,
};

module.exports = nextConfig;
