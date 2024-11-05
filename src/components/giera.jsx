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
import { useState } from "react"
import PocketBase from 'pocketbase';
const pb = new PocketBase(`http://${process.env.addres}:8080`);

export default function Giera({nazwa,description,image,availablee,cena,id,deletee}){
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [available, setAvailable] = useState(availablee)

  const handleDeleteClick = (e) => {
    e.preventDefault()
    setAlertOpen(true)
  }

    return(
        <Card className="w-[200px] h-[230px]">
            <CardHeader className="w-[200px] h-[100px] relative">
                <Image src={image} fill alt={nazwa}/>
            </CardHeader>
            <CardContent className='pt-4'>
                <span className="flex flex-row justify-between">
                    <CardTitle>{nazwa}</CardTitle><CardTitle>{cena}$</CardTitle>
                </span>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
      <Switch checked={available} onCheckedChange={setAvailable} />

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
              <AlertDialogTrigger asChild>
                <button onClick={handleDeleteClick} className="flex items-center text-red-500 hover:text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </button>
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
    </CardFooter>
        </Card>

    )
}