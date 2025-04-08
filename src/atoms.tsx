import { atom, selector } from "recoil";

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}
export interface IToDo{
    slice(arg0: number, targetIndex: number): unknown;
    text: string,
    id: number,
    category : Categories,
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
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