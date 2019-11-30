"use module"
import minimist from "minimist"

const argv= minimist( process.argv.slice( 2))

export {
	isSession(){
		return argv.session || argv.s
	}
}

