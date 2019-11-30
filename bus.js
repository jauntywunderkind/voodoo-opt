"use module"
import { sessionBus, systemBus} from "dbus-native"
import { isSession} from "./args.js"

export function bus(){
	try{
		if( isSession()){
			return sessionBus()
		}
		throw new Error()
	}catch( ex){
		return systemBus()
	}
}
export default bus

//export async function end( b= bus()){
//	bus().connection.end()
//}
