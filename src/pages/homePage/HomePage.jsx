import React from "react";
import Header from "../../components/Header/Header";
import { useState } from "react";

const HomePage = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const handleTodoInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      const newTodo = {
        todoId: Date.now(), // 고유한 ID로 timestamp 사용 (다른 방식도 가능)
        text: todo, // 할 일 내용
        completed: false, // 기본적으로 완료 상태는 false로 설정
      };
      setTodoList([...todoList, newTodo]); // 새로운 todo 객체 추가
      setTodo(""); // 입력 필드 초기화
    }
  };
  const handleCheckboxChange = (todoId) => {
    const newTodoList = todoList.filter((item) => item.todoId !== todoId); // 완료되지 않은 할 일만 남김
    const completedTodo = todoList.find((item) => item.todoId === todoId); // 완료된 할 일을 찾음

    if (completedTodo) {
      setTodoList(newTodoList); // 완료된 할 일 제외한 새로운 리스트 설정
      setDoneList([...doneList, { ...completedTodo, completed: true }]); // 완료된 항목을 doneList에 추가
    }
  };

  const handleRemoveFromDoneList = (todoId) => {
    // doneList에서 체크된 항목을 제거
    const newDoneList = doneList.filter((item) => item.todoId !== todoId);
    setDoneList(newDoneList); // 업데이트된 리스트를 상태로 설정
  };
  return (
    <>
      <Header></Header>
      <main>
        <section className="homePage-firstSection">
          {" "}
          <input
            type="text"
            value={todo}
            onChange={handleTodoInputChange}
            className="homePage-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <button onClick={handleAddTodo}>+ 추가하기</button>
        </section>
        <section className="homePage-secondSection">
          <div className="homePage-todoContainer">
            <div className="homePage-todoLogo">TO DO</div>{" "}
            <div className="homePage-todoListContainer">
              {todoList.length > 0 ? (
                todoList.map((item) => (
                  <div className="homePage-checkBox" key={item.todoId}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCheckboxChange(item.todoId)}
                    />
                    <div>{item.text}</div>
                  </div>
                ))
              ) : (
                <img src="/todoIcon.png"></img>
              )}
            </div>{" "}
          </div>{" "}
          <div className="homePage-doneContainer">
            <div className="homePage-doneLogo">Done</div>
            <div className="homePage-doneListContainer">
              {doneList.length > 0 ? (
                doneList.map((item) => (
                  <div className="donePage-checkBox" key={item.todoId}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleRemoveFromDoneList(item.todoId)}
                    />
                    <span>{item.text}</span>
                  </div>
                ))
              ) : (
                <img src="/doneIcon.png"></img>
              )}
            </div>
          </div>{" "}
        </section>
      </main>
    </>
  );
};

export default HomePage;
