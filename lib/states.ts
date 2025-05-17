import { atom } from "jotai";

const isMenuOpen = atom(false);

const articleIdList = atom<number[]>([]);

const articleIndex = atom(0);

export { isMenuOpen, articleIdList, articleIndex };
