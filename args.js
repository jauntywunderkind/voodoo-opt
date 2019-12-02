"use module"
import minimist from "minimist"

function makeModule( a= process.argv, e= process.env){
	
	
}

export let argv()= minimist( process.argv.slice( 2))
export function setArgv( a){
	argv= a
}
export let env()= process.env
export function setEnv( e){
	env= e
}

export function isSession( a= argv()){
	return a.session || a.s
}
export function isSystem( a= argv()){
	return !isSession( a)
}
