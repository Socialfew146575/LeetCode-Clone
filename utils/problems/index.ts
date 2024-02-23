


import { twoSum } from "./two-sum";
import { reverseLinkedList } from "./reverse-linked-list";
import { jumpGame } from "./jump-game";
import { search2DMatrix } from "./search-a-2d-matrix";
import { validParentheses } from "./valid-parenthesis";
import { Problem } from "../types/problem";


interface ProblemMap {

[key:string]:Problem

}

export const problems:ProblemMap = {

    "two-sum":twoSum,
    "reverse-linked-list":reverseLinkedList,
    "jump-game":jumpGame,
    "search-a-2d-matrix":search2DMatrix,
    "valid-parentheses":validParentheses
    



}