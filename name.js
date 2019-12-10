"use module"
import Pipe from "async-iter-pipe"

import Call from "./call.js"
import Interface from "./interface.js"
import { get, gets} from "./opts.js"

export async function nameStreams( ...opts){
	const
	  add= new Pipe(),
	  remove= new Pipe(),
	  replaced= new Pipe()
	return {
		add,
		remove,
		replaced
	}
}

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
