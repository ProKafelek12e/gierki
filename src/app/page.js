"use client"
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Giera from '@/components/giera';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';

const pb = new PocketBase('http://172.16.15.134:8080');

export default function Home() {

  const [gierki,setGierki] = useState(null)

  useEffect(()=>{
    const samochody = async ()=>{
      try{
        const records = await pb.collection('gierki').getFullList({sort:'-created'})
        setGierki(records)
        console.log(records)
      } catch(error){
        console.log(error)
      }
    }
    samochody()
  },[])

  return (
    <div className="flex flex-row flex-wrap">
      {gierki && gierki.map((gra,idx)=>(
        <Giera key={gra.id} nazwa={gra.nazwa} description={gra.opis} cena={gra.cena} image={pb.files.getUrl(gra,gra.zdjecie)} available={gra.dostepne}/>
      ))}
      <Card className="w-[200px] h-[230px]"><Plus className="flex justify-center items-center" size={200}/></Card>
    </div>
  );
}
