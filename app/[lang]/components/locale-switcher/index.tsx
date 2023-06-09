'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '../../../../i18n-config'
import styles from './styles.module.css'

export default function LocaleSwitcher({lang}: {lang: string}) {
  const pathName = usePathname()
  
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => {
          return (
            <li className={styles.langListItem} key={locale}>
              <Link className={`${styles.langListItemLink} ${lang == locale ? styles.langActive : ''}` } href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}