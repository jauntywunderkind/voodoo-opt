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
export {
	process_ as process
}

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
	return sessionBus(): systemBus()
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

export function makeModule( opts= {}){
	let
	  process= opts.process|| process_
	  args= opts.args|| args,
	  env= opts.args|| env,
	  module= {
		arg,
		env,
		process,
		isSession,
		isSystem,
		bus,
	  }
	return boundClone( module)
}

const singleton= makeModule()
export const
  process= singleton.process,
  arg= singleton.arg,
  env= singleton.env,
  isSession= singleton.isSession,
  isSystem= singleton.isSystem,
  bus= singleton.bus

