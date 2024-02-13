'use client';
import LogIn from "./components/client/logIn";
import ToastLayout from "./components/essentials/toastlayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [cookieExists, setCookieExists] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const checkUserCookies = async () => {
        const response = await fetch('/api/authentication/homePageCreds');
        const result = await response.json();
        setCookieExists(result.cookieExist);
        if (result.cookieExist) {
          router.push('/dashboard');
        } else {
          setLoading(false);
        }
      };
      checkUserCookies();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: "url('CoverPage.jpg')" }}>
      {loading && <div>Loading...</div>}
      {!loading && !cookieExists && (
        <>
          <ToastLayout>
            <LogIn />
          </ToastLayout>
        </>
      )}
    </div>
  );
}