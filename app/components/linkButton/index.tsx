import Link from "next/link";
import styles from "./styles.module.css"

export default function LinkButton ({ text, selectedCategory}: {text: string, selectedCategory: string}) {
  return (
    <Link 
      className={`${styles.linkButton} ${selectedCategory == text ? styles.active: ''}`}
      href={`/products/${text}`}>
        {text}
    </Link>
  )
}