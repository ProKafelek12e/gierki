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
  


export default function Giera({nazwa,description,image,available,cena}){

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
            <CardFooter>
                <Switch checked={available}/>

                <DropdownMenu>
                  <DropdownMenuTrigger>...</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem><Pencil/>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem >
                        
                        <AlertDialog>
                          <AlertDialogTrigger><span className="text-red-400 hover:text-red-600"><Trash/>Delete</span></AlertDialogTrigger>
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
                              <AlertDialogAction>Continue</AlertDialogAction>
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