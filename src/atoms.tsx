import { atom } from "recoil";

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
