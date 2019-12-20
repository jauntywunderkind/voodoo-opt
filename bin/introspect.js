#!/usr/bin/env node
"use module"
import { get, gets} from "../opts.js"
import Introspect from "../introspect.js"
import { arg} from "../arg.js"

export async function main( ...opts){
	const
		objectPath_= arg( "objectPath", "object-path", "o", 0, "/org/freedesktop/DBus"),
		iface_= arg( "interfaceName", "interface", "i", 1, "org.freedesktop.DBus"),
		into= {
			args: undefined,
			stdout: undefined,
			warn: undefined,
			...objectPath_,
			...iface_ },
		ctx= await gets( into, ...opts)
	console.log("BIN-IF", ctx)
	const
		stdout= ctx.stdout,
		intro= await Introspect( ...opts, ctx)
	if( stdout){
		if( stdout.call){
			stdout= stdout.call( ctx)
		}
		console.log("BIN-STDOUT", {intro})
	}
	return intro

}
export default main

if( typeof process!== "undefined"&& import.meta.url=== `file://${process.argv[ 1]}`){
	main()
}
