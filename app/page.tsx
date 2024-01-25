import Link from "next/link";
import LogoutBtn from "./components/client/buttons/logout";
import CheckingGroups from "./components/client/checkingGroups";
import CheckingMembers from "./components/client/checkingMembers";
import LogIn from "./components/client/logIn";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import ToastLayout from "./components/essentials/toastlayout";


export default function Home() {
  
  try {
    const result: any = cookies().get('userloggedin')
    if(result !== undefined){
      console.log(result)
      return(
        <>
          <ToastLayout>
            <CheckingGroups />
            <LogoutBtn />
          </ToastLayout>
        </>
      )
    }
    else{
      return(
        <>
          <ToastLayout>
            <LogIn />
            <Link href={'/signup'}>Sign Up</Link>
          </ToastLayout>
        </>
      )
    }
  } catch (error) {
    
  }
}
