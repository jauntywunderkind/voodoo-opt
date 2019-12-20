"use module"
import Call from "./call.js"
import Interface from "./interface.js"
import { get} from "./opts.js"

/**
* @param busName - the dbus service
* @param objectPath - the interface being looked for
*/
export async function introspect( ...opts){
	console.log("IIINTRO-iface", opts)
	const iface= await Interface({
		busName: undefined,
		objectPath: undefined,
		interfaceName: "org.freedesktop.DBus.Introspectable"
	}, ...opts)
	console.log("IIINTRO-call")
	return Call({
		iface,
		method: "Introspect"
	}, ...opts)
}
export default introspect
