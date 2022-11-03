export default class Url {

    constructor(){
        this.home = '/';
        this.login = '/auth/login';
        this.register = 'auth/register';
        this.forgotPassword = 'auth/forgot-password';
        this.logout = 'auth/logout';
        this.search = '/search';
        this.profile= '/ca-nhan';
        this.categories = '/the-loai';
        this.category = this.categories+'/{id}';
        this.song = '/bai-hat/{id}';
        this.playlist = '/danh-sach-phat/{id}';
        this.single = '/ca-sy/{id}'
    }

    getSearch = (params) => {
        let url = this.search;
        if (Object.keys(params).length){
            const queryString = new URLSearchParams(params).toString();
            url = url+'?'+queryString;
        }
       
        return url
    }

    getSong = (id) => {
        //let url = '/bai-hat/'+slug+'-'+id+'.html';
        let url = this.song;
        url = url.replace('{id}', id);
        return url;
    }

    getCategory = (id) => {
        let url = this.category;
        url = url.replace('{id}', id);
        return url;
    }

    getPlaylist = (id) => {
        let url = this.playlist;
        url = url.replace('{id}', id);
        return url;
    }

    getSingle = (id) => {
        let url = this.single;
        url = url.replace('{id}', id);
        return url;
    }
}