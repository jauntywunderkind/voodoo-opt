"use module"
import Interface from "./interface.js"
import Call from "./call.js"

export async function listNames( opts= {}){
	const iface= Interface(
		opts.bus,
		"org.freedesktop.DBus",
		"/org/freedesktop/DBus",
		"org.freedesktop.DBus")
	return Call( iface, "ListNames")
}

export async function main( proc= typeof process!== "undefined"&& process){
	const names= await listNames()
	if( proc&& proc.stdout){
		proc.stdout.write( names.join( "\n"))
	}
	return names
}

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
