#!/usr/bin/env node
"use module"
import tape from "tape"
import { gets, NoAwait, NoExecute} from "../opt.js"
import { array} from "./_fixture.js"

tape( "gets picks", async function( t){
	t.plan( 1)
	const ctx= await gets({ a: undefined, b: undefined}, ...array)
	t.deepEqual( ctx,{ a: 1, b: 2})
	t.end()
})

tape( "gets picks from into", async function( t){
	t.plan( 1)
	const ctx= { d: 10}
	// we pick directly "into" ctx
	await gets.call( ctx, { a: undefined, d: undefined}, ...array)
	t.deepEqual( ctx,{ a: 1, d: 10})
	t.end()
})

tape( "gets will override into", async function( t){
	t.plan( 1)
	// a is going to get overwritten
	const ctx= { a: 10}
	await gets.call( ctx, { a: undefined}, ...array)
	t.deepEqual( ctx,{ a: 1})
	t.end()
})

tape( "gets allows 'ctx' to also be an opt", async function( t){
	t.plan( 1)
	const ctx= { a: 10}
	await gets.call( ctx, { a: undefined, b: undefined}, ...array, ctx)
	// a is kept, b is found
	t.deepEqual( ctx,{ a: 10, b: 2})
	t.end()
})

tape( "gets picks can be values", async function( t){
	t.plan( 1)
	const ctx= await gets({ z: 100}, ...array)
	t.deepEqual( ctx,{ z: 100})
	t.end()
})

tape( "gets picks are low priority", async function( t){
	t.plan( 1)
	const ctx= await gets({ a: 100}, ...array)
	t.deepEqual( ctx,{ a: 1})
	t.end()
})

tape( "gets picks can be a function", async function( t){
	t.plan( 1)
	function z(){
		return 42
	}
	const ctx= await gets({ z}, ...array)
	t.deepEqual( ctx,{ z: 42})
	t.end()
})

tape( "gets will fulfill an undefined pick if it 'hadThis'", async function( t){
	t.plan( 1)
	const ctx= await gets.call({ appName: undefined})
	t.deepEqual( ctx.appName, "voodoo-opt")
	t.end()
})
