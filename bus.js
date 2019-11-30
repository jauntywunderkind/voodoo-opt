"use module"
import { sessionBus, systemBus} from "dbus-native"
import { session as isSession} from "./args.js

export function bus(){
	try{
		if( isSession()){
			return sessionBus()
		}
		throw new Error()
	}catch(){
		return systemBus()
	}
}
export default bus
