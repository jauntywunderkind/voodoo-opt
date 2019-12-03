"use module"
import { process, bus as Bus} from "./config.js"
import Interface from "./interface.js"
import Call from "./call.js"

export async function listNames( opts= {}){
	const
	  bus= (opts.bus|| Bus)( opts),
	  iface= Interface(
		opts.bus,
		"org.freedesktop.DBus",
		"/org/freedesktop/DBus",
		"org.freedesktop.DBus")
	return Call( iface, "ListNames")
}

export async function filterNames( filter= opts&& opts.busName&& opts.busName(), opts= {}){
	if( typeof( filter)=== "string"){
		filter= new RegExp( filter)
	}
	if( !filter){
		throw new Error( "No filter specified")
	}
	const names= await opts.names|| await listNames( opts)
	return names.filter( name=> filter.match( name))[ 0]
}

export async function main( opts){
	const
		args= makeConfig( opts),
		names= await listNames( )
	if( proc&& proc.stdout){
		proc.stdout.write( names.join( "\n"))
	}
	return names
}

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
