'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function isInvalidText(text:string):boolean{
    return !text || text.trim() === '';
}

export async function registerUser(prevState:{message:string},formData:FormData):Promise<{message:string}>{
   const user = {
       firstName: formData.get('firstName'),
       lastName: formData.get('lastName'),
       email: formData.get('email'),
       password: formData.get('password'),
       confirmPassword: formData.get('confirmPassword'),
   }
   if( isInvalidText(user.firstName as string) ||
   isInvalidText(user.lastName as string) ||
   isInvalidText(user.email as string) ||
   isInvalidText(user.password as string) ||
   isInvalidText(user.confirmPassword as string)){
       return {
           message:"Invalid Input"
       };
   }

   if(user.password !== user.confirmPassword){
    return{
        message:"Passwords do not match"
    }
   }

   revalidatePath('/');
   redirect("/");

 }