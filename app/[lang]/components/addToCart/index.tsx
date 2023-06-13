'use client';
import { addToCart } from "@/app/lib/addToCart";
import styles from './styles.module.css'
import { useTransition } from 'react'


export default function AddToCart ({
  dictionary,
}: {
  dictionary: {
    addToCart: string
  }
}) {

  let [isPending, startTransition] = useTransition()

  const formSubmit = (e:any) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const data = {
      amount: form.amount.value as number,
      color: form.color.value as string
    }

    if(data.color == '')
    {

    }else if (data.amount < 1){

    }

    startTransition(() => addToCart(data))

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
    <button className={styles.formButton} type="submit">{dictionary.addToCart}</button>
   </form>
  )
}