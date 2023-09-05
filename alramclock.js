//clock----start
setInterval(() => {
    const t = new Date();
    let h = t.getHours();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h == 0) {
        h = 12;
    }
    const m = t.getMinutes();
    const s = t.getSeconds();
    document.getElementById("hourc").innerHTML = h;
    document.getElementById("minutec").innerHTML = m;
    document.getElementById("secondc").innerHTML = s;
    document.getElementById("ampmc").innerHTML = ampm;
}, 1000)

//clock------end


//alram------start
let hour = document.getElementById("hour");
let min = document.getElementById("minute");
let set = document.getElementById("set");
let ampm = document.getElementById("ampm");
let disp = document.getElementById("disptimedif");
let con2 = document.getElementById("con2");
let con3 = document.getElementById("con3");
let clralr = document.getElementById("clralr");
let uphor = 0;
let upmine = 0;
let upsec = 0
let setalr;
var timediff = 0;
let Exhour;
let Exminutes;
let Exsecond;

console.log(Exhour);

setInterval(()=>{
    let t = new Date();
    Exhour=t.getHours();
    Exsecond=t.getSeconds();
    Exminutes=t.getMinutes();
},1000)

set.addEventListener("click", () => {

    //checking whether alaram for am or pm;
    if (ampm.value == 'Pm') {
        // hour.value=parseInt(hour.value);
        if (hour.value != 12) {
            hour.value = parseInt(hour.value) + 12;
        }
        // console.log(hour.value)
    }
    else {
        if (ampm.value == "Am" && hour.value == 12) {
            hour.value = parseInt(hour.value) + 12;
        }
        // console.log(hour.value)
    }


    let hor = 0;
    let mine = 0;
    let sec = 0;
    // console.log(t.getHours());
    // console.log(hour.value);

    //calculating hour differance;

    if (Exhour <= hour.value) {
        hor = Math.abs(hour.value - Exhour);
    }
    else {
        hor = 24 - Exhour;
        hor = hor + parseInt(hour.value);
    }
    // console.log("hour before: " + hor);

    //calculating minutes differance
    //also syncing hour differance with minutes diferance;
    if (Exhour == hour.value) {
        if (Exminutes <= min.value) {
            console.log("input minutes "+ min.value);
            console.log("get minutes: "+ Exminutes);
            mine = Math.abs(parseInt(min.value) - Exminutes);
            console.log("minutes: " + mine);
        }
        else {
            hor = 24;
            // hor = hor + parseInt(hour.value);
            mine = 60 - Exminutes + parseInt(min.value);
            // if (mine >= 60) {
            //     hor = hor + 1;
            //     mine = mine - 60
            // }
            if (Exminutes > 0) {
                hor = hor - 1;
            }
        }
    }
    else {
        mine = 60 - Exminutes + parseInt(min.value);
        if(mine==60&&Exminutes==0&&min.value==0||mine >60&&Exminutes==0&&min.value!=0){
            mine=mine-60;
        }
        if (mine >= 60) {
            hor = hor + 1;
            mine = mine - 60
        }
        if (Exminutes > 0) {
            hor = hor - 1;
        }
    }    // mine = mine + parseInt(min.value);
    console.log("hour after: " + hor);
    console.log("minutes: " + mine);

    //second syncing with minutes;
    if (Exminutes != min.value) {
        let impsec=Exsecond;
        sec = 60 - impsec;
        if (sec > 0) {
            mine= mine-1;
            if (mine == -1) {
                mine = 0;
            }
        }
        // console.log(impsec,sec);
    }
    console.log("second: " + sec);

    let hormli = hor * 3600000;
    let minmli = mine * 60000;
    let secmli = sec * 1000;
    timediff = hormli + minmli + secmli;
    console.log("time in milisecond: "+timediff);

    disp.innerHTML = "Alarm in " + hor + " hours " + mine + " Minutes "+ sec +" seconds";
    con2.style.display = "none";
    con3.style.display = "block";

    uphor = hor;
    upmine = mine;
    upsec = sec;
})


set.addEventListener("click", () => {
    let pla = () => {
        let a = new Audio("./Alarm Clock Alarm.mp3");
        a.play();
    }
    setalr = setTimeout(() => {
        pla();
    }, timediff);
})






let uampm = ampm.value;
let uhour = hour.value;
let umin = min.value;
let settime = 0;
set.addEventListener("click", () => {
    // console.log(uphor, upmine);
    if (uphor == 0 && upmine == 0) {
        settime = upsec * 1000;
    }
    else {
        settime = 60000;
    }
})
set.addEventListener("click", () => {
    let id = setInterval(() => {
        if (upmine != 0) {
            upmine -= 1;
        }

        else if (upmine == 0 && uphor != 0) {
            uphor -= 1;
            upmine = 59;
        }
        else if (upmine == 0 && uphor == 0) {
            con2.style.display = "block";
            con3.style.display = "none";
            clearInterval(id);
        }
        // console.log("Alarm in " + uphor + " hours " + upmine + " Minutes");
        disp.innerHTML = "Alarm in " + uphor + " hours " + upmine + " Minutes";
    }, settime)


})



clralr.addEventListener("click", () => {
    clearTimeout(setalr);
    con2.style.display = "block";
    con3.style.display = "none";
    location.reload();
})

//alram---------end