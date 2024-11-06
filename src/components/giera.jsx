"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Pencil, Trash } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useState } from "react"
import PocketBase from 'pocketbase';
const pb = new PocketBase(`http://${process.env.addres}:8080`);

export default function Giera({nazwa,description,image,availablee,cena,id,deletee,updatee}){
  const [available, setAvailable] = useState(availablee)
  const [dane,setDane] = useState({nazwa:nazwa,opis:description,cena:cena,dostepne:availablee})
  const [zdjecie,setZdjecie] = useState(null)


  const handleDeleteClick = (e) => {
    e.preventDefault()
    setAlertOpen(true)
  }

  const handleInputChange = (idx, e)=>{
    setDane((prev)=>({
      ...prev,[idx]:e.target.value
    }))
    console.log(dane)
  }
  const handleZdjecie = (e)=>{
    setZdjecie(e.target.files[0])
    console.log(e.target.files[0])
  }

  const update = async ()=>{
    const formData = new FormData()
    formData.append('nazwa', dane.nazwa)
    formData.append('opis', dane.opis)
    formData.append('cena', dane.cena)
    // formData.append('dostepne', dane.dostepne)
    formData.append('zdjecie',zdjecie)
    console.log(formData)
    try {
      const record = await pb.collection('gierki').update(id, formData);
      updatee(record);
    } catch (error) {
      console.error('Error updating record:', error);
    }
    }
    return(
        <Card className="w-[250px] h-[330px]">
            <CardHeader className="w-[250px] h-[170px] relative">
                <Image src={image} fill alt={nazwa}/>
            </CardHeader>
            <CardContent className='pt-4'>
                <span className="flex flex-row justify-between">
                    <CardTitle>{nazwa}</CardTitle><CardTitle>{cena}$</CardTitle>
                </span>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">

      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger>
              <span className="flex items-center">
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="nazwa">Nazwa</Label>
              <Input defaultValue={nazwa} type="text" id="nazwa" placeholder="nazwa" onChange={(e)=>{handleInputChange("nazwa", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="opis">Opis</Label>
              <Input defaultValue={description} type="text" id="opis" placeholder="opis" onChange={(e)=>{handleInputChange("opis", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="cena">Cena</Label>
              <Input defaultValue={cena} type="number" id="cena" placeholder="cena" onChange={(e)=>{handleInputChange("cena", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="dostepne">Dostępne</Label>
              <Input defaultValue={availablee} type="number" max={1} min={0} id="dostepne" placeholder="dostepne" onChange={(e)=>{handleInputChange("dostepne", e)}}/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="image">Zdjęcie</Label>
              <Input type="file" id="image" placeholder="Zdjęcie" onChange={(e)=>{handleZdjecie(e)}}/>
            </div>
            <Button onClick={update}>Submit</Button>
            </DialogContent>
          </Dialog>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span className="flex items-center text-red-500 hover:text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={async ()=>{
                    await pb.collection('gierki').delete(id);
                    deletee(id)
                  }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Switch checked={available} onCheckedChange={setAvailable} />
    </CardFooter>
        </Card>

    )
}