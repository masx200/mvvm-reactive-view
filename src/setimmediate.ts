export function setimmediate(fun){

return Promise.resolve().then(fun)
}
