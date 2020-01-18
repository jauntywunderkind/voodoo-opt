#!/usr/bin/env node
import get from "../get.js"
import tape from "tape"

const env={
	APP_NAME: "get-test"
}

tape( "get with env opt", async function( t){
	const appName = await get( "appName", { env})
	t.equal( appName, "get-test", "appName=get-test")
	t.end()
})

tape( "get with env context", async function( t){
	const appName = await get.call({ env}, "appName")
	t.equal( appName, "get-test", "appName=get-test")
	t.end()
})

tape( "get with context and env opt", async function( t){
	const appName = await get.call({}, "appName", { env})
	t.equal( appName, "get-test", "appName=get-test")
	t.end()
})

tape( "get with context and env opt", async function( t){
	const appName = await get.call({ env: "get-nope"}, "appName", { env})
	t.equal( appName, "get-test", "appName=get-test")
	t.end()
})
