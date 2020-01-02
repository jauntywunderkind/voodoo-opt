#!/usr/bin/env node
"use module"
import tape from "tape"
import { get, NoExecute} from "../opt.js"
import { array} from "./_fixture.js"

tape( "get picks first seen entry", async function( t){
	t.plan( 1)
	const a= await get( "a", ...array)
	t.equal( a, 1)
	t.end()
})

tape( "get picks a partially-filled entry", async function( t){
	t.plan( 1)
	const b= get( "b", ...array)
	t.equal( b, 2)
	t.end()
})

tape( "get returns undefined if nothing found", async function( t){
	t.plan( 1)
	const b= get( "d", ...array)
	t.equal( b, undefined)
	t.end()
})

tape( "get will run functions", async function( t){
	t.plan( 1)
	function fn(){
		return 42
	}
	const out= get( "fn",{ fn})
	t.equal( out, 42)
	t.end()
})

tape( "get will not run NoExecute functions", async function( t){
	t.plan( 1)
	function fn(){
		return 42
	}
	fn[ NoExecute]= true
	const out= get( "fn",{ fn})
	t.equal( out, fn)
	t.end()
})
