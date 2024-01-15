import DataSender from "./components/client/dataSender";
import GetData from "./components/server/getData";

export default function Home() {
  return (
    <>
    <GetData />
      <DataSender />
      
    </>
  )
}
