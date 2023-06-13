import styles from './styles.module.css'

export default function ErrorMessage({message, type}:{message: string, type: string}) {
  return (<div className={`${styles.errorMessage} ${styles[type]}`}>{message}</div>)
}