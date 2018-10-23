




import api from '~/api'

export const state = () => ({
    list: null
})

export const mutations = {
    set_post (store, data){
        store.list = data
    },
    reset_post(store){
        store.list = null
    }
}

export const actions = {
    
}