import { atom, selector } from "recoil";

export interface IToDo{
    slice(arg0: number, targetIndex: number): unknown;
    text: string,
    id: number,
    category : "TO_DO" | "DOING" | "DONE",
}

export const categoryState = atom({
    key: "category",
    default: "TO_DO",
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "ToDoSelector",
    get: ({ get })=> {
        const toDos = get(toDoState);
        const category = get(categoryState);

        /* if(category === "TO_DO") 
            return toDos.filter(toDo => toDo.category === "TO_DO")
        if (category === "DOING") 
            return  toDos.filter(toDo => toDo.category === "DOING")
        if (category === "DONE") 
            return toDos.filter(toDo => toDo.category === "DONE")
 */
        return toDos.filter(toDo => toDo.category === category)

    }
})