import { useMemo } from 'react';
import styles from './styles.module.css'
import { filterTodos } from '../../utils';



export default function TodoList({ todos, theme, tab }:{ todos:any, theme:string, tab:string }) {

  const visibleTodos = useMemo(
    ()=> filterTodos(todos, tab),
    [todos, tab]
  )

  // const visibleTodos = filterTodos(todos, tab)

  return (
    <div className={styles[theme]}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
      <ul>
        {visibleTodos.map((todo:any) => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
