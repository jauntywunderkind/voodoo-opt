"use module"
import minimist from "minimist"

const argv= minimist( process.argv.slice( 2))

export function isSession( a= argv){
	return a.session || a.s
}
export function isSystem( a= argv){
	return !isSession( a)
}

export function names( a= argv){
	return a[ '_']|| [ "org.mpris.MediaPlayer2.*"]
}
