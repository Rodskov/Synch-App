import CheckingGroups from "./components/client/checkingGroups";
import CheckingMembers from "./components/client/checkingMembers";
import DataSender from "./components/client/dataSender";
import GetData from "./components/server/getData";
import GetTeamData from "./components/server/getTeamData";

export default function Home() {
  return (
    <>
      <CheckingGroups />
      <CheckingMembers />
      {/* <GetTeamData /> */}
      {/* <GetData /> */}
      {/* <DataSender />   */}
    </>
  )
}
