'use client';
import Link from "next/link";
import LogIn from "./components/client/logIn";
import ToastLayout from "./components/essentials/toastlayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const [cookieExists, setCookieExists] = useState<any>(null)
  const [loading, setLoading] = useState<any>(true)
  const router = useRouter()
  useEffect(() => {
    try {
      const checkUserCookies = async () => {
        const response = await fetch('/api/authentication/homePageCreds')
        const result = await response.json()
        setCookieExists(result.cookieExist)
        if(result.cookieExist == true){
          router.push('/dashboard')
        }
        else{
          setLoading(false)
        }
      }
      checkUserCookies()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return(
    <>
        {loading}
        {!loading && !cookieExists && (
        <>
        <ToastLayout>
          <LogIn />
          <Link href={'/signup'}>Sign up</Link>
        </ToastLayout>
        </>
        )}
    </>
  )
}
