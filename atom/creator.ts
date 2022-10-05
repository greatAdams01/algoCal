import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { UserCreator } from "../util/appInterface";
const { persistAtom } = recoilPersist()

export const UserAtom = atom({
	key: "Creator-User-Atom",
	default: null as unknown as Partial<UserCreator>,
	effects_UNSTABLE: [persistAtom],
});