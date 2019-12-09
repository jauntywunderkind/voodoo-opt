"use module"
import Call from "./call.js"
import { bus, get} from "./config.js"
import Interface from "./interface.js"

export async function introspect( ...opts){
	const iface= await Interface({
		busName: null,
		objectPath: null,
		interfaceName: "org.freedesktop.DBus.Introspectable"
	}, ...opts)
	return Call({
		iface,
		method: "Introspect"
	}, ...opts)
}
export default introspect
