#!/usr/bin/env node
"use module"
import { get, gets} from "../opts.js"
import Introspect from "../introspect.js"
import { arg} from "../arg.js"

export async function main( ...opts){
	const
		busName_= arg("busName", "bus-name", "b", 0, "org.freedesktop.DBus"),
		objectPath_= arg( "objectPath", "object-path", "o", 1, "/org/freedesktop/DBus"),
		iface_= arg( "interfaceName", "interface", "i", 2, "org.freedesktop.DBus.Introspectable"),
		into= {
			args: undefined,
			stdout: undefined,
			warn: undefined,
			...busName_,
			...objectPath_,
			...iface_ },
		ctx= await gets( into, ...opts)
	if( ctx.busName&& !ctx.objectPathHad){
		ctx.objectPath= `/${ctx.busName.split(".").join("/")}`
	}

	const
		stdout= ctx.stdout,
		intro= await Introspect( ctx, ...opts)
	if( stdout){
		if( stdout.write){
			stdout.write( intro)
		}
		stdout.end()
	}
	return intro
}
export default main

if( typeof process!== "undefined"&& import.meta.url=== `file://${process.argv[ 1]}`){
	main()
}
