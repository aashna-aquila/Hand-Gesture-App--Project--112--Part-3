prediction1="";
presiction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="capture">';
    })
}

console.log('ml5 version',ml5.version);
teach=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json',modelloaded);

function modelloaded()
{
    console.log('Model has been Loaded');
}

function speak()
{
    var s1=windiow.speechSynthesis;
    speakdata1="The First Prediction is"+prediction1;
    speakdata2="The Second Prediction is"+prediction2;
    var merge=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    s1.speak(merge);
}

function prediction()
{
    cap=document.getElementById('capture');
    teach.classify(cap,gotresult);

}

function gotresult(error,results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="amazing")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[0].label=="best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }


        if(results[1].label=="amazing")
        {
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if(results[1].label=="victory")
        {
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
        if(results[1].label=="best")
        {
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
    }
}