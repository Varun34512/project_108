Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yhmh6kf3C/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

var prediction = "";

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if (results[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
        if (results[0].label == "amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if (results[0].label == "praying") {
            document.getElementById("update_emoji").innerHTML = "&#128591;"
        }
        if (results[0].label == "pointing") {
            document.getElementById("update_emoji").innerHTML = "&#128073;"
        }
    }
}

function speak() {
    var synth = window.speechSynthesis
    speak_data = "The hand gesture is" + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}