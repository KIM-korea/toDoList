const toDoForm=document.getElementById("todo-form");  
const toDoList=document.getElementById("todo-list"); 
const toDoInput=toDoForm.querySelector("input");

const TODOS_KEY="todos";

let toDos=[];


function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));

}

function deleteToDo(event){
    const li=event.target.parentElement;
    li.remove();//이벤트가 발생한 li태그 제거거
    toDos=toDos.filter((toDo)=>toDo.id!==parseInt(li.id));//지우고 todos업데이트
    saveToDos();//로컬 스토리지에 저장
}

function paintToDo(newTodo){
//이때 매개변수는 객체이다.
    const li=document.createElement("li");
    li.id=newTodo.id;//부무노드 id에 뉴투두id를 삽입한다.

    const span=document.createElement("span");
    span.innerText=newTodo.text;//span의 text안에 객체의 텍스트를 넣는다.

    const button=document.createElement("button");
    button.innerText="X";

    button.addEventListener("click",deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    //span과 버튼을 li의 자식태그로 넣는다. 이때 div가 아니므로 줄은 바뀌지 않는다.

    toDoList.appendChild(li);
}

function handleToDoSubmit(event){

    event.preventDefault();

    const newTodo=toDoInput.value;

    toDoInput.value="";

    const newTodoObj={
        text:newTodo,
        id: Date.now(),
    };

    toDos.push(newTodoObj);//toDos는 객체로 이루어진 변수이다.

    paintToDo(newTodoObj);

    saveToDos();

}

toDoForm.addEventListener("submit",handleToDoSubmit);
//submit이 눌렸을 때 이 모든것을 시행하는 것이다...



const savedToDos=localStorage.getItem(TODOS_KEY);
//그럼얘는 string의 배열인가?


//이부분은 페이지를 새로고침 시 로컬 스토리지에서 불러오는 것이다.
//
if(savedToDos!==null){

    const parsedToDos=JSON.parse(savedToDos);
    toDos=parsedToDos;

   parsedToDos.forEach(paintToDo);

}