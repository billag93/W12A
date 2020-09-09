
class BetterAjax {
    ajax;
    type;
    location;
    successfunction;
    loadingfunction;
    failurefuntion;
    constructor(httpType, url, success, loading, failure) {
        this.ajax = new XMLHttpRequest();
        this.type = httpType;
        this.location = url;
        this.successfunction = success;
        this.loadingfunction = loading;
        this.failurefuntion = failure;
    }
    sendRequest() {
        let holder = this;
        this.ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                holder.successfunction();
            } else if (this.readyState != 4) {
                holder.loadingfunction();
            } else {
                holder.failurefuntion();
            }
        };
        this.ajax.open(this.type, this.location, true)
        this.ajax.send();
    }
}

function greatsuccess(){
    document.getElementById('new-activity').innerHTML = JSON.parse(this.ajax.responseText).activity;
}

function loading(){
    document.getElementById('new-activity').innerHTML = "Loading";
}

function failure(){
    document.getElementById('new-activity').innerHTML = "Failure";
}

let acivityAPI = new BetterAjax("GET", "http://www.boredapi.com/api/activity/", greatsuccess, loading, failure);
function getmyacivity(){
    activityAPI.sendRequest();
}



class BoredActivity{

    content = "";

    greatsuccess(){
        document.getElementById('new-activity').innerHTML = JSON.parse(this.ajax.responseText).activity;
        this.content = JSON.parse(this.ajax.responseText).activity;
    }
    
    loading(){
        document.getElementById('new-activity').innerHTML = "Loading";
    }
    
    failure(){
        document.getElementById('new-activity').innerHTML = "Failure";
    }
    getActivity(){
        let getNewActivity= new BetterAjax("GET", "http://www.boredapi.com/api/activity/", greatsuccess, loading, failure);
        getNewActivity.sendRequest();
    }

    getGroupActivity(){
        let getNewActivity= new BetterAjax("GET", "http://www.boredapi.com/api/activity?participants=4", greatsuccess, loading, failure);
        getNewActivity.sendRequest();
    }

    getFreeActivity(){
        let getNewActivity= new BetterAjax("GET", "http://www.boredapi.com/api/activity?price=0.0", greatsuccess, loading, failure);
        getNewActivity.sendRequest();
    }

    getRecreationalActivity(){
        let getNewActivity= new BetterAjax("GET", "http://www.boredapi.com/api/activity?type=recreational", greatsuccess, loading, failure);
        getNewActivity.sendRequest();
    }
}

let myobject = new BoredActivity();
function getActivitypush(){myobject.getActivity()}
function getActivitypull(){myobject.getGroupActivity()}
function getActivitypeel(){myobject.getFreeActivity()}
function getActivitypart(){myobject.getRecreationalActivity()}
document.getElementById('clickhere').addEventListener('click', getActivitypush);
document.getElementById('clickhere2').addEventListener('click', getActivitypull);
document.getElementById('clickhere3').addEventListener('click', getActivitypeel);
document.getElementById('clickhere4').addEventListener('click', getActivitypart);