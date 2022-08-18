import { ChangeEvent, FC } from 'react'
import styles from './Search.module.scss'

interface SearchProps {
  searchTerm: string,
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search:FC<SearchProps> = ({handleSearch, searchTerm}) => {
  return (
    <div className={styles.search}>
      <input type='text' value={searchTerm} onChange={handleSearch}/>
    </div>
  )
}

export default Search