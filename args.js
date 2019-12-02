"use module"
import minimist from "minimist"

function args_( argv= this&& this.process.argv|| process.argv){
	return minimist( argv.splice( 2))
}
function env_( env= this&& this.process.env|| process.env){
	return env
}
function process_(){
	return process
}

function isSession( a= argv()){
	return a.session || a.s
}
function isSystem( a= argv()){
	return !isSession( a)
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
	  args= opts.args|| args_,
	  env= opts.args|| env_,
	  module= {
		arg,
		env,
		process,
		isSession,
		isSystem
	  }
	return boundClone( module)
}

const singleton= makeModule()

export let
  arg= singleton.arg,
  env= singleton.env,
  isSession= singleton.isSession,
  isSystem= singleton.isSystem,
  process= singleton.process,
