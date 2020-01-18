#!/usr/bin/env node
import get from "../get.js"
import tape from "tape"

tape( "get a default", async function( t){
	const appName = await get( "appName")
	t.equal( appName, "voodoo-opt", "appName=voodoo-opt")
	t.end()
})

tape( "get on a context", async function( t){
	const appName = await get.call({}, "appName")
	t.equal( appName, "voodoo-opt", "appName=voodoo-opt")
	t.end()
})

tape( "get atop a context undefined", async function( t){
	const appName = await get.call({ appName: undefined}, "appName")
	t.equal( appName, "voodoo-opt", "appName=voodoo-opt")
	t.end()
})
