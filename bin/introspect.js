#!/usr/bin/env node
"use module"
import { get, gets} from "../opts.js"
import Introspect from "../introspect.js"
import { arg} from "../arg.js"

export async function main( ...opts){
	console.log("pre-arg")
	const
		op= arg( "objectPath", "object-path", "o", 0, "/org/freedesktop/DBus"),
		iface= arg( "interface", "interface", "i", 1, "org.freedesktop.DBus")
	const gots= await gets({ ...op}, ...opts)
	const { warn, argv, objectPath}= get({
		warn: null,
		argv: null,
		...op
		//iface: "interface",
		//ifaceShort: "i",
		//ifaceOrd: "2"
	})
	if( objectPathOrd){
		objectPathOrd= Number.parseInt( objectPathOrd)
	}
	if( ifaceOrd){
		ifaceOrd= Number.parseInt( ifaceOrd)
	}
	//let objectPath= argv[ objectPath]|| argv[ objectPathShort]|| argv[ objectPathOrd]

	await get("warn", ...opts) // runs warn
	const ctx= await gets({
		stdout: null,
		objectPath: "/org/freedesktop/DBus",
		interface: "org.freedesktop.DBus"
	}, ...opts)
	const intro= Introspect( ...opts, ...ctx)
	if( stdout){
		//
	}
	return intro

}
export default main

if( typeof process!== "undefined"&& import.meta.url=== `file://${process.argv[ 1]}`){
	main()
}
