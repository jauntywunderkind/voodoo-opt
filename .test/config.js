#!/usr/bin/env node
"use module"
import tape from "tape"
import config from "../config.js"

tape( "process", function( t){
	t.plan( 1)
	t.equal( config.process(), process)
	t.end()
})

tape( "env", function( t){
	t.plan( 1)
	t.equal( config.env(), process.env)
	t.end()
})
