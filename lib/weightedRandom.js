function r(stats, rnd) {  
var list = Object.entries(stats).reduce((next,aggr)=>{
  var [key,val]=next
  if(aggr.length)
  val  += aggr[aggr.length-1][1]
	aggr.push([key, val])
  return aggr
},[])
var max=list[list.length-1][1]
var rand=rnd||Math.random
var hit=rand()*max||0; 
return hit
}

var forest={tree: 17, mushroom:3, squirrel: 1, girl:2}

r(forest)
