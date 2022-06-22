export const imgerror = {
    inserted(el,options){
        el.src = el.src || options.value
        el.onerror = function(){
            el.src = options.value
        }
    },
    componentUpdated(el,options){
        el.src = el.src || options.value
    }

}