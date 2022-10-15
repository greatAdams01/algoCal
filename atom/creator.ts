import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { UserCreator } from "../util/appInterface";

export const UserAtom = atom({
	key: "Creator-User-Atom",
	default:'',
});