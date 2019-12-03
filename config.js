"use module"
import { sessionBus, systemBus} from "dbus-native"
import minimist from "minimist"

// bunch of jiggery so we can export define and "process" while still accessing the global process
const process__= typeof( process)!== "undefined"? process: {}
// iife so we can have a "process" function that doesn't clash with builtin
const process_= (function(){
	return function process(){
		return process__
	}
})()

function args( argv= this&& this.process().argv|| process.argv){
	return minimist( argv.splice( 2))
}
function env( env= this&& this.process().env|| process.env){
	return env
}

function isSession( args= this&& this.args()|| args()){
	return args.session|| args.s
}
function isSystem( args= this&& this.args()|| args()){
	return !( args.session|| args.s)

}

function bus( isSession= this&& this.isSession? this.isSession(): isSession()){
	return isSession? sessionBus(): systemBus()
}

function boundClone( o){
	const clone= {}
	for( let i in o){
		let fn= o[ i]
		if( fn instanceof Function){
			clone[ i]= fn.bind( o)
		}else{
			// not actually a fn, just copy
			clone[ i]= fn
		}
	}
	return clone
}

export function makeConfig( opts= {}){
	let config= {
		process: opts.process|| process,
		args: opts.args|| args,
		env: opts.env|| env,
		isSession: opts.isSession|| isSession,
		isSystem: opts.isSystem|| isSystem,
		bus: opts.bus|| bus
	}
	return boundClone( config)
}

const
	singleton= makeConfig(),
	_p= singleton.process,
	_a= singleton.args,
	_e= singleton.env,
	_iSe= singleton.isSession,
	_iSy= singleton.isSystem,
	_bus= singleton.bus
export {
	_p as process,
	_a as args,
	_e as env,
	_iSe as isSession,
	_iSy as isSystem,
	_bus as bus
}
