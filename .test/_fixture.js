"use module"
export const
	a1= {
		a: 1
	},
	ab2= {
		a: 2,
		b: 2
	},
	ac3= {
		a: 3,
		c: 3
	},
	abc= {
		a: 42,
		b: 42,
		c: 42
	},
	array= [ abc, ac3, ab2, a1]
const default_= {
	a1,
	ab2,
	ac3,
	abc
}
export default default_


if( typeof process!== "undefined"&& `file://${ process.argv[ 1]}`=== import.meta.url){
	console.log( JSON.stringify( default_))
}
