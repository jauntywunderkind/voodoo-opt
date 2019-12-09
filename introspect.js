"use module"
import { bus, get} from "./config.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function introspect( opts){
	let
	  bus= get( "bus", opts),
	  busName= get( "busName", opts),
	  objectPath= get( "objectPath", opts),
	  

	  bus= 
	  bus= opts.bus&& opts.bus()|| bus(),
	  busName= opts.busName&& opts.busName()|| opts.busName,
	  objectPath= opts.path&& opts.path()
	  iface= Interface(
		bus,
		busName,
		
		"org.freedesktop.DBus.Introspectable.Introspect")
	return Call( iface, "Introspect")
}
export default introspect
