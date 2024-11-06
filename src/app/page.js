"use client"
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import Giera from '@/components/giera';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Item } from '@radix-ui/react-dropdown-menu';


const pb = new PocketBase(`http://${process.env.addres}:8080`);

export default function Home() {

  const [gierki,setGierki] = useState(null)
  const [dane,setDane] = useState({nazwa:null,opis:null,cena:null,dostepne:null})
  const [zdjecie,setZdjecie] = useState(null)
  const [open,setOpen] = useState(false)

  useEffect(()=>{
    const getGry = async ()=>{
      try{
        const records = await pb.collection('gierki').getFullList({sort:'-created'})
        setGierki(records)
        console.log(records)
      } catch(error){
        console.log(error)
      }
    }
    getGry()
  },[])
  
  
  
  const handleInputChange = (id,e)=>{
    setDane((prev)=>({
      ...prev,
      [id]: e.target.value
    }))
    console.log(dane)
  }
  const handleZdjecie = (e)=>{
    setZdjecie(e.target.files[0])
  }

  const handleSubmit = async ()=>{
    const formData = new FormData()
    formData.append("nazwa", dane.nazwa)
    formData.append("opis", dane.opis)
    formData.append("cena", dane.cena)
    if(zdjecie)
    formData.append("zdjecie",zdjecie)
    try{
      const record = await pb.collection('gierki').create(formData);
      setGierki((prev)=>([
        ...prev,
        record
      ]))
    }catch(error){
      console.log(error)
    }
    setOpen(false)
  }

  const onDelete = (id)=>{
    setGierki((prev)=>(
      prev.filter((el)=>{
        return el.id !=id
      })
    ))
  }
  const onUpdate = (record)=>{
    var index = null
    var tmpGierki = [...gierki]
    for(let i in gierki){
      if(gierki[i].id == record.id) index=i
    }
    console.log(record,index)
    tmpGierki[index] = record
    setGierki(tmpGierki)
    console.log(index)
  }


  return (
    <div className="flex flex-row flex-wrap">
      {gierki && gierki.map((gra,idx)=>(
        <Giera key={gra.id} nazwa={gra.nazwa} description={gra.opis} cena={gra.cena} image={pb.files.getUrl(gra,gra.zdjecie)} availablee={gra.dostepne} id={gra.id} deletee={onDelete} updatee={onUpdate}/>
      ))}
      <Sheet open={open}>
        <SheetTrigger onClick={()=>{setOpen(true)}}>
          <Card className="w-[200px] h-[230px]">
            <Plus className="flex justify-center items-center cursor-pointer" size={200}/>
          </Card>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Dodaj nową gre</SheetTitle>
          </SheetHeader>

          <div className='mt-5 flex flex-col w-full items-center flex-wrap gap-5'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="nazwa">Nazwa</Label>
              <Input type="text" id="nazwa" placeholder="nazwa" onChange={(e)=>{handleInputChange("nazwa", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="opis">Opis</Label>
              <Input type="text" id="opis" placeholder="opis" onChange={(e)=>{handleInputChange("opis", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="cena">Cena</Label>
              <Input type="number" id="cena" placeholder="cena" onChange={(e)=>{handleInputChange("cena", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="image">Zdjęcie</Label>
              <Input type="file" id="image" placeholder="Zdjęcie" onChange={(e)=>{handleZdjecie(e)}}/>
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>



        </SheetContent>
      </Sheet>

      
    </div>
  );
}
