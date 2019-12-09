"use module"
import Call from "./call.js"
import { get, gets} from "./config.js"
import Interface from "./interface.js"

export async function listNames( ...opts){
	const iface= await Interface({
		busName: "org.freedesktop.DBus",
		objectPath: "/org/freedesktop/DBus",
		interfaceName: "org.freedesktop.DBus"
	}, ...opts)
	return Call({
		iface,
		method: "ListNames"
	}, ...opts)
}
export default listNames

export async function main( ...opts){
	const
	  names= await listNames( ...opts),
	  stdout= await get( "stdout", ...opts)
	stdout.write( names.join( "\n"))
}
if( typeof process!== "undefined"&& `file://${process.argv[ 1]}`=== import.meta.url){
	main()
}
