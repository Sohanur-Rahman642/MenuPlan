import * as Constants from '../constants/Constants'


const filterData = (data, status) => {
   
    const names = status.filter ( item => {
            return item.isChecked
        })
        
    let  result = []
    let  filter = []

    names.forEach( val => {
        if(val.code === Constants.CODE_SUPERACTIVE){
             filter = data.filter( item => item.status.toLowerCase() === Constants.SUPERACTIVE.toLowerCase())
        }else if(val.code === Constants.CODE_ACTIVE){
             filter = data.filter( item => item.status.toLowerCase() === Constants.ACTIVE.toLowerCase())
        }else if(val.code === Constants.CODE_BORED){
             filter = data.filter( item => item.status.toLowerCase() === Constants.BORED.toLowerCase())
        }else {
            return
        }

        filter.forEach(item => {
            result.push(item)
        })
        
    })

    return result
}

export default filterData;