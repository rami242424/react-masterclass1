import { atom, selector } from "recoil";

export interface IToDo{
    slice(arg0: number, targetIndex: number): unknown;
    text: string,
    id: number,
    category : "TO_DO" | "DOING" | "DONE",
}

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "ToDoSelector",
    get: ({ get })=> {
        const toDos = get(toDoState);
        return [
            toDos.filter(toDo => toDo.category === "TO_DO"),
            toDos.filter(toDo => toDo.category === "DOING"),
            toDos.filter(toDo => toDo.category === "DONE")
        ];
    }
})