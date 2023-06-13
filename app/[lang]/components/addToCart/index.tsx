'use client';
import { addToCart } from "@/app/lib/addToCart";
import styles from './styles.module.css'
import { useState, useTransition } from 'react'
import ErrorMessage from "../errorMessage";


export default function AddToCart ({
  dictionary,
  productId,
}: {
  dictionary: {
    addToCart: string,
    productId: number
  }
}) {

  let [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState({message: '', type: ''})

  const formSubmit = (e:any) => {
    e.preventDefault()
    clearErrorMessage()

    const form = e.target as HTMLFormElement
    const data = {
      productId: productId,
      amount: form.amount.value as number,
      color: form.color.value as string
    }

    if (data.color == '')
    {
      setErrorMessage({message: "Renk bilgisi giriniz", type: "warning"})
      return
    } else if (data.amount < 1){
      setErrorMessage({message: "Miktar en az 1 olmalı", type: "error"})
      return
    }

    startTransition(async () =>{
      const result = await addToCart(data)
      if (result && result.id){
        setErrorMessage({message: "Ürünler sepete eklendi", type: "success"})
        setTimeout(() => {
          setErrorMessage({message: '', type: ''})
        }, 3000);
      }
    })

  }

  const clearErrorMessage = () => {
    setErrorMessage({message: '', type: ''})
  }

  return (
   <form onSubmit={formSubmit}>
    <div>&nbsp;</div>
    <input 
      className={styles.amountInput} 
      type="text" 
      name="color"
    />
    <input 
      className={styles.amountInput} 
      type="number" 
      name="amount" 
      defaultValue={1}
    />
    <button disabled={isPending} className={styles.formButton} type="submit">{dictionary.addToCart}</button>
    {errorMessage.message && <ErrorMessage {...errorMessage} />}
   </form>
  )
}