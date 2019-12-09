"use module"
import { bus, get} from "./config.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function introspect( opts){
	let
	  bus= get( "bus", opts),

	  bus= 
	  bus= opts.bus&& opts.bus()|| bus(),
	  busName= opts.busName&& opts.busName()|| opts.busName,
	  objectPath= opts.path&& opts.path()
	  iface= Interface(
		opts,
		opts.busName,
		opts.,
		"org.freedesktop.DBus.Introspectable.Introspect")
	return Call( iface, "Introspect")
}
export default introspect
