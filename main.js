var status= "";
objects=[];

function setup(){
    canvas= createCanvas(380,380);
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    canvas.center();

}

img= "";

    function start(){
        objectDetector= ml5.objectDetector('cocossd',modelLoaded);
        document.getElementById("status").innerHTML="Status- detecting objects";
    }

function preload(){
    img= loadImage('dog_cat.jpg');
}

function draw(){
    image(video,0, 0, 380, 380);
    
    if(status!=""){

        objectDetector.detect(video, gotResults);

        r= random(255);
        g= random(255);
        b= random(255);

        for(i=0; i<objects.length; i++){
            document.getElementById("number_of_objects").innerHTML= " Number of objects detected - "+objects.length;
            document.getElementById("status").innerHTML="Objects Detected";
            percent= Math.floor(objects[i].confidence*100);

        
            fill(r, g, b);
            stroke(r, g, b);

            text(objects[i].label + " " + percent+ "%",  objects[i].x+15, objects[i].y+15 );
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    
            
        }
    }
}

function modelLoaded(){
    console.log("model Loaded");
    status=true;

}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}