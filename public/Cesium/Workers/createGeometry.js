define(["./when-4bbc8319","./PrimitivePipeline-40f9db75","./createTaskProcessorWorker","./Transforms-d13cc04e","./Matrix2-9aa31791","./RuntimeError-346a3079","./ComponentDatatype-93750d1a","./WebGLConstants-1c8239cc","./combine-83860057","./GeometryAttribute-43536dc0","./GeometryAttributes-7827a6c2","./GeometryPipeline-b1a36b18","./AttributeCompression-af389d04","./EncodedCartesian3-f286cedc","./IndexDatatype-b7d979a6","./IntersectionTests-96a04219","./Plane-318d6937","./WebMercatorProjection-58801a11"],(function(e, r, t, n, a, i, o, s, c, u, d, f, b, m, l, p, y, P){"use strict";var v={};function k(r){var t=v[r];return e.defined(t)||("object"==typeof exports?v[t]=t=require("Workers/"+r):require(["Workers/"+r],(function(e){v[t=e]=e}))),t}return t((function(t, n){for(var a=t.subTasks,i=a.length,o=new Array(i),s=0; s<i; s++){var c=a[s],u=c.geometry,d=c.moduleName;if(e.defined(d)){var f=k(d);o[s]=f(u,c.offset)}else o[s]=u}return e.when.all(o,(function(e){return r.PrimitivePipeline.packCreateGeometryResults(e,n)}))}))}));
