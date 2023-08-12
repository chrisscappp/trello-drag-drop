import { useState } from 'react';
import './App.css';

type TodoType = {
  id: number,
  title: string
}

type BoardType = {
  id: number,
  title: string,
  items: TodoType[]
}

const emptyTodo = {
  id: 0,
  title: ""
}

function App() {

  const [boards, setBoards] = useState([
    {id: 1, title: "Сделать", items: [{id: 1, title: "Пойти в магаз"}, {id: 2, title: "Уроки"}]},
    {id: 2, title: "Сделано", items: [{id: 3, title: "Покакать"}, {id: 4, title: "Пописать"}]},
    {id: 3, title: "Проверить", items: [{id: 5, title: "Сделать трелло"}, {id: 6, title: "Сделать драг н дроп на corp"}]},
  ])

  const [currentBoard, setCurrentBoard] = useState<BoardType>()
  const [currentItem, setCurrentItem] = useState<TodoType>(emptyTodo)

  const dragOverHandler = (e: any) => {
    e.preventDefault()
    if (e.target.className === "item") {
      e.target.style.backgroundColor = "red"
    }
  }
  const dragLeaveHandler = (e: any) => {
    e.preventDefault()
    e.target.style.backgroundColor = "#fcfcf9"
  }
  const dragStartHandler = (e: any, board: BoardType, item: TodoType) => {
      setCurrentBoard(board)
      setCurrentItem(item)
  }
  const dragEndHandler = (e: any) => {
    e.preventDefault()
    e.target.style.backgroundColor = "#fcfcf9"
  }
  const dropHandler = (e: any, board: BoardType, item: TodoType) => {
    e.preventDefault()
    if (currentBoard) {
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      const dropIndex = board.items.indexOf(item)
      board.items.splice(dropIndex + 1, 0, currentItem)
      setBoards(boards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }))
    }
  }

  const dropCardHandler = (e: any, board: BoardType) => {
    if (currentBoard) {
      board.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      setBoards(boards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }))
    }
  }

  return (
    <div className="App">
      {
        boards.map(board => {
          return (
            <div 
              className = "board"
              onDragOver = {(e) => dragOverHandler(e)}
              onDrop = {(e) => dropCardHandler(e, board)}
            >
                <div className = "board__title">
                  {board.title}
                </div>
                {board.items.map(item => {
                  return (
                    <div 
                      className = "item"
                      draggable = {true}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, board, item)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, board, item)}
                    >
                      {item.title}
                    </div>
                  )
                })}
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
