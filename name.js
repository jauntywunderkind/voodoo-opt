"use module"
import config from "./config.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function listNames( opts= {}){
	const
	  bus= opts.bus&& opts.bus()|| config.bus()
	  iface= Interface(
		opts,
		"org.freedesktop.DBus",
		"/org/freedesktop/DBus",
		"org.freedesktop.DBus")
	return Call( iface, "ListNames")
}
export default listNames
