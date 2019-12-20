"use module"
import dbus from "dbus-native"
import minimist from "minimist"
const { sessionBus, systemBus}= dbus

let warn= false

export const warned= Symbol.for( "dbus-starter:config:warned")

const noRun= {
	run: false
}

function conf( key, self, opts){
	let value
	if( self&& self!== globalThis){
		value= self[ key]
	}
	let hadValue= !!value
	if( value=== undefined){
		value= defaults[ key]
	}
	RUN: if( value&& value.call){
		if( opts&& opts.run=== false){
			break RUN
		}
		value= value.call( self)
	}
	return value
}

export const defaults= Object.freeze({
	globalThis(){
		return globalThis
	},
	process( globalThis= conf( "globalThis", this)){
		return globalThis.process
	},
	argv( process= conf( "process", this)){
		return process.argv
	},
	args( argv= conf( "argv", this)){
		return minimist( argv.slice( 2))
	},
	env( process= conf( "process", this)){
		return process.env
	},
	isSession( args= conf( "args", this), defaultBus= conf( "defaultBus", this)){
		if( args.system){
			return false
		}
		return args.session|| defaultBus=== "session"
	},
	isSystem( args= conf( "args", this), defaultBus= conf( "defaultBus", this)){
		if( args.system){
			return true
		}
		return !args.session|| defaultBus=== "system"
	},
	defaultBus: "session",
	bus( isSession= conf( "isSession", this)){
		return isSession? sessionBus(): systemBus()
	},
	busNames( args= conf( "args", this), env= conf( "env", this)){
		return args.dbusNames|| arg.dbusName|| env.DBUS_NAMES|| env.DBUS_NAME
	},
	stdout( process= conf( "process", this)){
		return process.stdout
	},
	warnedSymbol: Symbol.for("dbus-starter:config:warned"),
	warn( process= conf( "process", this), warnedSymbol= conf( "warnedSymbol", this)){
		if( process[ warnedSymbol]){
			return
		}
		Object.defineProperty( process, warned, {
			value: true
		})
		process.on("uncaughtException", console.error)
		process.on("unhandledRejection", console.error)
	},
	ifs: "\n",
	listNames: lateLoad( "listNames", "./names.js"),
	TRIPWIRE: function(){
		console.error("Tripwire; should not invoke config items until needed")
		process.exit( 1)
	}
})

let singleton_
export function singleton(){
	if( !singleton_){
		singleton_= { ...defaults}
	}
	return singleton_
}
export default singleton
export function setSingleton( singleton){
	singleton_= singleton
}

function lateLoad( name, module){
	const wrapper= {[ name]: async function(){
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
