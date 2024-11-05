import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Switch } from "./ui/switch"
import Image from "next/image"

export default function Giera({nazwa,description,image,available}){

    return(
        <Card className="w-[200px] h-[230px]">
            <CardHeader className="w-[200px] h-[100px] relative">
                <Image src={image} fill/>
            </CardHeader>
            <CardContent className='pt-4'>
                <CardTitle>{nazwa}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Switch checked={available}/>
            </CardFooter>
        </Card>

    )
}