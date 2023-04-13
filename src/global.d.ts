export {}

//Declare the window variable where all datas are stored in UG.com
declare global {
  interface Window {
    UGAPP: any
  }
}

//Declaring vexchords as module because the lib doesn't provide typescript support
declare module 'vexchords'
