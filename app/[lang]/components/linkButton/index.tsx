import Link from "next/link";
import styles from "./styles.module.css"

export default function LinkButton ({url, text, selectedCategory}: {url: string, text: string, selectedCategory?: string}) {
  return (
    <Link className={`${styles.linkButton} ${selectedCategory == encodeURIComponent(text) ? styles.active: ''}`} href={url}>{text}</Link>
  )
}