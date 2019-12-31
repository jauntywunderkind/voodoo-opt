"use module"
import minimist from "minimist"
import xdg from "xdg-basedir"

let warn= false

export const warned= Symbol.for( "voodoo-opt:config:warned")

export function conf( key, self, opts){
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
	appName: "voodoo-opt",
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
	xdg,
	TRIPWIRE: function(){
		console.error("Tripwire; should not invoke config items until needed")
		process.exit( 1)
	}
})

export function makeDefaults( ...more){
	const made= {...defaults}
	for( let m of more){
		Object.assign( made, m)
	}
	return made
}

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
