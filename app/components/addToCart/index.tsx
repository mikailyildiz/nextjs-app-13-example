'use client';
import { addToCart } from "@/app/lib/addToCart";
import styles from './styles.module.css'

export default function AddToCart () {
  return (
   <form action={addToCart}>
    <div>&nbsp;</div>
    <input className={styles.amountInput} type="number" name="amount" defaultValue={1}/>
    <button className={styles.formButton} type="submit">Add to cart</button>
   </form>
  )
}