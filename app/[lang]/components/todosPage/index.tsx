"use client"

import { useState } from 'react';
import TodoList from '../todoList';
import { createTodos } from '../../utils';


const todos = createTodos();

export default function TodosPage() {

  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <button onClick={() => setTab('all')}>
          All
        </button>
        <button onClick={() => setTab('active')}>
          Active
        </button>
        <button onClick={() => setTab('completed')}>
          Completed
        </button>
      </div>
      <br />
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <label>
          <input
            type="checkbox"
            checked={isDark}
            onChange={e => setIsDark(e.target.checked)}
          />
          Dark mode
        </label>
      </div>

      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

