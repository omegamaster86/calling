import { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoType } from '../types/Todo';
import Todo from './Todo';
import Link from 'next/link';

// Todo一覧を表示するコンポーネント
const Todos = () => {
  // Todo一覧を管理するState
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Todo一覧を取得する関数
  const fetchTodos = async () => {
    // APIからTodo一覧を取得する
    try {
      const res = await axios.get<TodoType[]>('http://localhost:3000/todos');

      // 取得したTodo一覧をStateにセットする
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // コンポーネントがマウントされたタイミングでTodo一覧を取得する
  useEffect(() => {
    // Todo一覧を取得する関数を呼び出す
    fetchTodos();
  }, []);

  return (
    <div className="space-y-6 w-3/4 max-w-lg pt-10 m-auto">
      <label className="block text-xl font-bold text-gray-700">Todo Index</label>
      <div className="items-center justify-center">
        {todos.map((todo) => (
          <Link
            href={`todos/${todo.id}`}
            key={todo.id}
          >
            <Todo todo={todo} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Todos;