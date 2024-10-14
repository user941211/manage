/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app 디렉토리의 모든 파일
    "./pages/**/*.{js,ts,jsx,tsx}", // pages 디렉토리의 모든 파일 (있다면)
    "./components/**/*.{js,ts,jsx,tsx}", // components 디렉토리의 모든 파일
    // 추가적인 경로가 있다면 여기에 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};