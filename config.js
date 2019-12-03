"use module"
import { sessionBus, systemBus} from "dbus-native"
import minimist from "minimist"

export const defaults= {
	process( global= this&& this.globalThis&& this.globalThis()|| globalThis){
		return global.process
	},
	args( argv= this&& this.process().argv|| process.argv){
		return minimist( argv.splice( 2))
	},
	env( env= this&& this.process().env|| process.env){
		return env
	},
	isSession_( args= this&& this.args()|| args()){
		return args.session|| args.s
	},
	isSystem( args= this&& this.args()|| args()){
		return !( args.session|| args.s)
	},
	bus( isSession= this&& this.isSession? this.isSession(): isSession()){
		return isSession? sessionBus(): systemBus()
	}
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
	const config= Object.assign( {}, defaults, opts)
	return boundClone( config)
}

export const
	singleton= makeConfig(),
	process= singleton.process,
	args= singleton.args,
	env= singleton.env,
	isSession= singleton.isSession,
	isSystem= singleton.isSystem,
	bus= singleton.bus
