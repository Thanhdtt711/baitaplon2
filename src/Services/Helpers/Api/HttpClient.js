import config from '../../../Configs/Config.json';

const {SERVER_API} = config;

export default class HttpClient{

    constructor(){
        //Danh sách các API
        this.categories = '/categories';
        this.users = '/users';
        this.songs = '/songs';
        this.options = '/options';
        this.playlists = '/playlists';
        this.songPlaylists = '/song_playlists';
        this.songSingle = '/song_single';
        this.single = '/singles';
    }

    getUrl = (url) => {
        return SERVER_API+url;
    }

    callApi = async (url, method='GET', body=null, token=null) => {

        url = this.getUrl(url);

        const headers = {
            "Content-Type": "application/json"
        };

        if (token!==null){
            headers["Authorization"] = `Bearer ${token}`;
        }

        const options = {
            method: method,
            headers: headers
        }

        if (body!==null){
            options["body"] = JSON.stringify(body);
        }

        const response = await fetch(url, options);
    
        const data = await response.json();
        return {
            response: response,
            data: data
        };
    }

    get = (url, params={}, token) => {
       
        if (Object.keys(params).length){
            const queryString = new URLSearchParams(params).toString();
            url = url+'?'+queryString;
        }
        
        return this.callApi(url, 'GET', null, token);
    }

    post = (url, body, token=null) => {
        return this.callApi(url, 'POST', body, token);
    }

    put = (url, id, body, token=null) => {
        url = url+'/'+id;
        return this.callApi(url, 'PUT', body, token);
    }

    patch = (url, id, body, token=null) => {
        url = url+'/'+id;
        return this.callApi(url, 'PATCH', body, token);
    } 

    delete = (url, id, token=null) => {
        url = url+'/'+id;
        return this.callApi(url, 'DELETE', null, token);
    }
}