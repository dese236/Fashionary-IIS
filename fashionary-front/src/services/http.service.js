import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:5000'



var axios = Axios.create({
    withCredentials: true
})

export async function apiService(endpoint, method = 'GET', data = null){
    try {
        const res =  await fetch(`${BASE_URL}${endpoint}`,{
            'method':'POST',
            crossorigin: true,
            headers : {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
    },
    body:JSON.stringify(data)
    })

    return res
    } catch (err) {
        if(endpoint !== 'auth/signup'){
            if (err.response && err.response.status === 401) {
                window.location.assign('/#/login')
            }
            console.log(err , "err bottom")
            throw err
        }
    }
}

