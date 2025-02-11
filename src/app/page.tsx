import { Body } from "@/Components/Body";
import { Header } from "@/Components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen " style={{fontFamily: "Noto Sans, Plus Jakarta Sans"}}>
      <Header/>
      <Body/>
    </div>
  );
}
