import LogoutBtn from "./components/client/buttons/logout";
import CheckingGroups from "./components/client/checkingGroups";
import CheckingMembers from "./components/client/checkingMembers";
import DataSender from "./components/client/dataSender";
import LogIn from "./components/client/logIn";
import { cookies } from "next/headers";


export default function Home() {
  try {
    const result: any = cookies().get('userloggedin')
    if(result !== undefined){
      console.log(result)
      return(
        <>
          <CheckingGroups />
          <LogoutBtn />
        </>
      )
    }
    else{
      return(
        <>
          <LogIn />
        </>
      )
    }
  } catch (error) {
    
  }
}
