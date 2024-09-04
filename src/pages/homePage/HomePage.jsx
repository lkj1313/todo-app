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
      setTodoList([...todoList, todo]);
      setTodo(""); // 입력 필드 초기화
    }
  };

  const handleCheckboxChange = (index) => {
    const newTodoList = [...todoList];
    const [completedItem] = newTodoList.splice(index, 1); // todoList에서 아이템 제거
    setTodoList(newTodoList);
    setDoneList([...doneList, completedItem]); // doneList에 아이템 추가
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
          ></input>
          <button onClick={handleAddTodo}>+ 추가하기</button>
        </section>
        <section className="homePage-secondSection">
          <div className="homePage-todoContainer">
            <div className="homePage-todoLogo">TO DO</div>
            <div className="homePage-todoListContainer">
              {todoList.map((item, index) => (
                <div className="homePage-checkBox" key={index}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="homePage-doneContainer">
            <div className="homePage-doneLogo">Done</div>
            <div className="homePage-doneListContainer">
              {doneList.map((item, index) => (
                <div key={index}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>{" "}
        </section>
      </main>
    </>
  );
};

export default HomePage;
