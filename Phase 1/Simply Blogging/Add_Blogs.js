
var i = 0;
var blogString = "";

function addBlog(){
    let currentBLogContents = document.getElementById("theBlogs").innerHTML;
    let blogSkeleton1 = "<div class=\"card blog\"><img class=\"card-img-top\" src=\"";
    let blogSkeleton2 = "\" alt=\"\"><div class=\"card-body\"><h2>";
    let blogSkeleton3 = "</h2><p class=\"card-text\">";
    let blogSkeleton4 = "</p></div></div>";

    let imgUrl = document.getElementById("image").value;
    let title = document.getElementById("title").value;
    let text = document.getElementById("articles").value;
    console.log(typeof text);

    let completedBlog = blogSkeleton1+imgUrl+blogSkeleton2+title+blogSkeleton3+text+blogSkeleton4;

    let i1 = "<div class=\"row\"><div class=\"col-4\">";
    let i2 = "<div class=\"col-4\">";
    let end_div = "</div>";

    let putIn;

    if(i%3==0){
        putIn=i1+completedBlog+end_div;
        console.log(completedBlog);
        console.log(putIn);
    }
    else if (i%3==1){
        putIn=i2+completedBlog+end_div;
        console.log(putIn);
    }
    else{
        putIn=i2+completedBlog+end_div+end_div;
    }

    blogString+=putIn;
    

    document.getElementById("theBlogs").innerHTML=blogString;
    i++;
}

