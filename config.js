"use module"
import dbus from "dbus-native"
import minimist from "minimist"
const { sessionBus, systemBus}= dbus

let warn= false


export const defaults= {
	process( global= this&& this!== globalThis&& this.globalThis? this.globalThis(): globalThis){
		return global.process
	},
	args( argv= this&& this!== globalThis? this.process().argv: globalThis.process.argv){
		return minimist( argv.splice( 2))
	},
	env( env= this&& this!== globalThis? this.process().env: globalThis.process.env){
		return env
	},
	isSession( args= this&& this!== globalThis? this.args(): args(), defaultBus= this&& this.defaultBus|| defaults.defaultBus){
		if( args.system){
			return false
		}
		return args.session|| defaultBus=== "session"
	},
	isSystem( args= this&& this!== globalThis? this.args(): args(), defaultBus= this&& this.defaultBus|| defaults.defaultBus){
		if( args.system){
			return true
		}
		return !args.session|| defaultBus=== "system"
	},
	defaultBus: "session",
	bus( isSession= this&& this!== globalThis? this.isSession(): isSession()){
		return isSession? sessionBus(): systemBus()
	},
	busNames( env= this&& this!== globalThis? this.env(): env()){ // it'd be nice to make this programmable but without functions.callee no way
		return [ env.DBUS_NAME]
	},
	stdout( process= this&& this!== globalThis? this.process().stdout: globalThis.process.stdout){
		return process
	},
	warn( process= this&& this!== globalThis? this.process(): globalThis.process){
		if( !warn){
			warn= true
			process.on("uncaughtException", console.error)
			process.on("unhandledRejection", console.error)
		}
	},
	listNames: lateLoad( "listNames", "./names.js", "listNames")
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

const defaults_= defaults
export function makeConfig( opts= {}, defaults= defaults_){
	const config= Object.assign( {}, defaults, opts)
	return boundClone( config)
}

export let process, args, env, isSession, isSystem, defaultBus, bus, busNames, stdout
export let singleton= makeConfig()
export default singleton
export function setSingleton( value){
	singleton= value
	process= singleton.process,
	args= singleton.args,
	env= singleton.env,
	isSession= singleton.isSession,
	isSystem= singleton.isSystem,
	defaultBus= singleton.defaultBus,
	bus= singleton.bus,
	busNames= singleton.busNames,
	stdout= singleton.stdout
}
setSingleton( singleton)

async function lateLoad( name, module, fn){
	const wrapper= {[ name]: function(){
		let item= fn.item
		if( !item){
			if( !fn.loading){
				fn.loading= import( name).then( function( mod){
					fn.loading= null
					return fn.item= (mod[ name]|| mod.default[ name])
				})
			}
			item= await fn.loading
		}
		return item
	  }},
	  fn= wrapper[ name]
	return fn
}
