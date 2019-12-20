#!/usr/bin/env node
"use module"
import { get, gets} from "../opts.js"
import Introspect from "../introspect.js"
import { arg} from "../arg.js"

export async function main( ...opts){
	const
		objectPath_= arg( "objectPath", "object-path", "o", 0, "/org/freedesktop/DBus"),
		iface_= arg( "iface", "interface", "i", 1, "org.freedesktop.DBus"),
		into= {
			stdout: null,
			warn: null,
			...objectPath_,
			...iface_ },
		ctx= await gets( into, ...opts)
	ctx.warn()
	const
		stdout= ctx.stdout(),
		intro= Introspect( ...opts, ctx)
	if( stdout){
		if( stdout.call){
			stdout= stdout.call( ctx)
		}
		console.log(intro)
	}
	return intro

}
export default main

if( typeof process!== "undefined"&& import.meta.url=== `file://${process.argv[ 1]}`){
	main()
}
